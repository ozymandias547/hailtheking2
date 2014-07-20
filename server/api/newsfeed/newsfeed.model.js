'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsFeed = new Schema({
  title: String,
  date: Number,
  active: Boolean
});

module.exports = mongoose.model('NewsFeed', NewsFeed);