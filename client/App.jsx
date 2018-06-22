import React from 'react';
import * as api from './services';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommentsWithReplies from './components/comments-with-replies';

import styled from 'styled-components';

const ContentWrapper = styled.main`
  width: 820px !important;
  margin: 0 auto;
  border: 1px solid #dcdcdc;
  padding: 20px 60px;
  box-sizing: border-box;
  list-style-type: none;
  display: grid;
  gap: 0.5rem;
`;

const ModalWrapper = styled.div``;

const Wrapper = styled.div``;

const CommentsSection = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: [],
      commentText: '',
      authorName: '',
    };
  }
  componentDidMount() {
    document.addEventListener('keypress', this.addFromKeyboard);
    this.getComments();
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.addFromKeyboard);
  }

  addFromKeyboard = e => {
    if (e.which === 13) {
      this.addComment();
    }
  };

  getComments = () => {
    api
      .findComments()
      .then(({ data }) => {
        return this.filterComments(data);
      })
      .then(res => {
        console.log(res);
        this.setState({
          comments: api.sortCommentsByDate(res),
        });
      });
  };

  filterComments = comments => {
    const parents = comments.filter(({ parent }) => !parent);
    const children = comments.filter(({ parent }) => parent);

    children.forEach(child => {
      parents.forEach(parent => {
        if (child.parent === parent._id) {
          if (!parent.replice) {
            parent.replice = [child];
          } else {
            parent.replice = [...parent.replice, child];
          }
        }
      });
    });

    return parents;
  };

  textAreaHandler = e => {
    this.setState({
      commentText: e.target.value,
    });
  };

  inputHandler = e => {
    this.setState({
      authorName: e.target.value,
    });
  };

  uploadHandler = e => {
    console.log(e);
  };

  addComment = () => {
    const { authorName, commentText, comments } = this.state;

    if (!authorName.trim().length || !commentText.trim().length) {
      alert('Author name and text should not be empty!');
      return;
    }

    const newComment = {
      text: commentText,
      authorName,
      timestamp: new Date().getTime(),
    };

    this.setState({
      authorName: '',
      commentText: '',
    });

    api.createComment(newComment).then(() => {
      this.getComments();
    });
  };

  replyCommentHandler = (_id, text, author) => {
    const newComment = {
      text: text.trim(),
      authorName: author.trim(),
      timestamp: new Date().getTime(),
      parent: _id,
    };

    api.createComment(newComment).then(() => {
      this.getComments();
    });
  };

  editCommentHandler = (_id, data) => {
    const { comments } = this.state;

    api.updateComment(_id, data).then(() => {
      this.getComments();
    });
  };

  deleteCommentHandler = _id => {
    api.removeComment(_id).then(() => {
      this.getComments();
    });
  };

  render() {
    const { comments, commentText, authorName } = this.state;
    return (
      <Wrapper>
        <ModalWrapper id="modal-wrapper" />
        <ContentWrapper>
          <textarea
            style={{
              width: '100%',
              borderRadius: '15px',
              padding: '5px',
              fontSize: '0.8em !important',
              marginBottom: '10px',
              marginTop: '10px',
              height: '100px',
              padding: '15px',
              borderRadius: '30px',
            }}
            placeholder="Input your comment here"
            autoFocus
            fullWidth
            type="textarea"
            value={commentText}
            onChange={this.textAreaHandler}
          />
          <TextField
            placeholder="Input your name here"
            type="input"
            value={authorName}
            onChange={this.inputHandler}
          />
          <Button color="primary" onClick={this.addComment}>
            Add Comment
          </Button>
          {comments.length > 0 && (
            <CommentsSection>
              {comments.map(comment => (
                <CommentsWithReplies
                  key={comment.timestamp}
                  replyComment={this.replyCommentHandler}
                  editComment={this.editCommentHandler}
                  deleteComment={this.deleteCommentHandler}
                  comment={comment}
                />
              ))}
            </CommentsSection>
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}
