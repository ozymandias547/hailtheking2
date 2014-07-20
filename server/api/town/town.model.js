'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TownSchema = new Schema({
  name: String,
  user: String,
  position : {
  	x: Number,
  	y: Number
  },
  population: Number,
  structures: {
  	townHall: Number,
  	barracks: Number
  },
  active: Boolean
});

module.exports = mongoose.model('Town', TownSchema);