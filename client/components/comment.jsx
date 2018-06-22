import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Modal from './modal';
import Image from '../images/user.png';

const SingleComment = styled.li`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-column-gap: 1em;
  font-family: sans-serif;
  font-size: 0.8rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #eff1f3;
  border-radius: 30px;
  padding: 15px;
  transition: all 0.2s linear;
`;

const AuthorName = styled.h3`
  font-size: 1.1em;
  color: #365899;
  margin: 0;
`;

const CommentText = styled.p`
  padding: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
`;

const ActionButton = styled.span`
  text-align: center;
  cursor: pointer;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  background: #365899;
  font-size: 0.9em;
  margin-right: 10px;
  border-radius: 5px;
  transition: all 0.1s linear;
  border: 1px solid transparent;

  &:hover {
    background: white;
    color: #365899;
    border: 1px solid #365899;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default class Comment extends React.Component {
  static propTypes = {
    authorName: string.isRequired,
    text: string.isRequired,
    _id: string,
  };
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isShowReply: false,
      isShowEdit: false,
      replyText: '',
      editText: '',
      replyAuthor: '',
    };
  }
  openReply = () => {
    const { reply } = this.props;
    this.setState({
      isShowReply: true,
      isShowEdit: false,
    });
  };

  submitReply = () => {
    const { reply } = this.props;
    const { replyText, replyAuthor } = this.state;

    reply(replyText, replyAuthor);

    this.hideReply();
  };

  hideReply = () => {
    this.setState({
      isShowReply: false,
      replyText: '',
      replyAuthor: '',
    });
  };

  typeReply = e => {
    this.setState({
      replyText: e.target.value,
    });
  };

  typeReplyAuthor = e => {
    this.setState({
      replyAuthor: e.target.value,
    });
  };

  showEdit = () => {
    this.setState({
      isShowEdit: true,
      isShowReply: false,
      editText: this.props.text,
    });
  };

  typeEditComment = e => {
    this.setState({
      editText: e.target.value,
    });
  };

  submitEdit = () => {
    const { edit, _id } = this.props;
    const { editText } = this.state;

    edit(_id, { text: editText.trim() });

    this.hideEdit();
  };

  hideEdit = () => {
    this.setState({
      editText: '',
      isShowEdit: false,
    });
  };

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  deleteComment = () => {
    const { del, _id } = this.props;

    del(_id);

    this.setState({
      modalIsOpen: false,
    });
  };

  render() {
    const { authorName, text } = this.props;
    const {
      modalIsOpen,
      isShowReply,
      isShowEdit,
      replyText,
      editText,
      replyAuthor,
    } = this.state;
    return (
      <SingleComment>
        <Avatar src={Image} />
        <Content>
          <AuthorName>{authorName}</AuthorName>
          <CommentText>{text}</CommentText>
          <Controls>
            <ActionButton onClick={this.showEdit}>Edit</ActionButton>
            <ActionButton onClick={this.toggleModal}>Delete</ActionButton>
            <ActionButton onClick={this.openReply}>Reply</ActionButton>
          </Controls>
          {isShowReply && (
            <div>
              <textarea
                style={{
                  width: '90%',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '5px',
                  fontSize: '0.8em !important',
                  marginBottom: '10px',
                  marginTop: '10px',
                  height: '60px',
                }}
                type="textarea"
                value={replyText}
                onChange={this.typeReply}
              />
              <TextField
                placeholder="Leave reply"
                type="text"
                value={replyAuthor}
                onChange={this.typeReplyAuthor}
              />
              <Controls>
                <ActionButton onClick={this.submitReply}>Reply</ActionButton>
                <ActionButton onClick={this.hideReply}>Cancel</ActionButton>
              </Controls>
            </div>
          )}
          {isShowEdit && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <textarea
                style={{
                  border: 'none',
                  borderRadius: '15px',
                  padding: '5px',
                  fontSize: '0.8em !important',
                  marginBottom: '10px',
                  marginTop: '10px',
                  height: '60px',
                }}
                value={editText}
                onChange={this.typeEditComment}
              />
              <Controls>
                <ActionButton onClick={this.submitEdit}>Confirm</ActionButton>
                <ActionButton onClick={this.hideEdit}>Cancel</ActionButton>
              </Controls>
            </div>
          )}
        </Content>
        {modalIsOpen && (
          <Modal>
            <div
              onClick={this.toggleModal}
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                zIndex: '5',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  position: 'fixed',
                  width: '350px',
                  padding: '14px',
                  fontFamily: 'sans-serif',
                  height: '180px',
                  'background-color': 'aliceblue',
                  top: '30%',
                  left: '30%',
                  fontSize: '1.1em',
                  'z-index': '10',
                  'border-radius': '8px',
                  textAlign: 'center',
                }}
              >
                <h3>ModalContent</h3>
                <p>Are You sure that you want delete this comment?</p>
                <div>
                  <ActionButton onClick={this.deleteComment}>
                    Sure!
                  </ActionButton>
                  <ActionButton onClick={this.toggleModal}>No!</ActionButton>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </SingleComment>
    );
  }
}
