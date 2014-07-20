/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var NewsFeed = require('./newsfeed.model');

// Get list of news items
exports.index = function(req, res) {
  NewsFeed.find(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single news item
exports.show = function(req, res) {
  NewsFeed.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    return res.json(item);
  });
};

// Creates a news item in the newsfeed DB.
exports.create = function(req, res) {
  NewsFeed.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.json(201, item);
  });
};

// Updates an existing news item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  NewsFeed.findById(req.params.id, function (err, item) {
    if (err) { return handleError(err); }
    if(!item) { return res.send(404); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, item);
    });
  });
};

// Deletes a news item from the DB.
exports.destroy = function(req, res) {
  NewsFeed.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}