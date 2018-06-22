import React from 'react';
import styled from 'styled-components';
import Comment from './comment';
import { sortCommentsByDate } from '../services';

const Group = styled.div`
  margin-right: 10px;
`;

const ChildsList = styled.ul`
  padding-left: 60px;
`;

const CommentsWithReplies = ({
  comment,
  replyComment,
  editComment,
  deleteComment,
}) => {
  const pushParentId = (text, author) => {
    replyComment(comment._id, text, author);
  };

  return (
    <Group>
      <Comment
        text={comment.text}
        reply={pushParentId}
        edit={editComment}
        del={deleteComment}
        _id={comment._id}
        authorName={comment.authorName}
      />
      <ChildsList>
        {comment.replice &&
          sortCommentsByDate(comment.replice).map(replice => (
            <Comment
              key={replice.timestamp}
              _id={replice._id}
              text={replice.text}
              authorName={replice.authorName}
              reply={pushParentId}
              edit={editComment}
              del={deleteComment}
            />
          ))}
      </ChildsList>
    </Group>
  );
};

export default CommentsWithReplies;
