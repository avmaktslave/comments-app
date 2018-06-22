import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

const app = feathers();
const SERVER_URL = 'http://localhost:3030';

app.configure(rest(SERVER_URL).fetch(window.fetch));

const comments = app.service('comments');

export const findComments = () => {
  return comments.find();
};

export const createComment = data => {
  return comments.create(data);
};

export const getComment = id => comments.get(id);

export const updateComment = (id, data) => {
  return comments.patch(id, data);
};

export const removeComment = id => {
  return comments.remove(id);
};

export const sortCommentsByDate = comments => {
  return [...comments].sort((a, b) => b.timestamp - a.timestamp);
};
