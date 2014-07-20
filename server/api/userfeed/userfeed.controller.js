/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /user              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('../user/user.model.js');

// Get list of users public data ( not only for admins )
exports.index = function(req, res) {
  
  // Return only the fields that the public has access to.

  User.find({}, { gold : 1, name : 1, towns: 1, population: 1 }, function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });

};

// Get a single users public info
exports.show = function(req, res) {
  User.findById(req.params.id,{ gold : 1, name : 1, towns: 1, population: 1 } , function (err, user) {
    


    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(user);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}