const comments = require('./comments/comments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(comments);
};
