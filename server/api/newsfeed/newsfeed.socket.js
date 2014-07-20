/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var NewsFeed = require('./newsfeed.model');

exports.register = function(socket) {
  NewsFeed.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  NewsFeed.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('newsfeed:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('newsfeed:remove', doc);
}