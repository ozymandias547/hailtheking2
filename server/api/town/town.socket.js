/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var town = require('./town.model');

exports.register = function(socket) {
  town.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  town.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('thing:remove', doc);
}