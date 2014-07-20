/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var NewsFeed = require('../api/newsfeed/newsfeed.model');
var User = require('../api/user/user.model');
var Town = require('../api/town/town.model');


NewsFeed.find({}).remove(function() {
  NewsFeed.create(
  {
    title : "Decided to use <a href='http://www.pixijs.com/' target='_blank'>Pixi.js</a> for the map renderer due to it's WEBGL support with good backwards compaibility.",
    date : 1405811815702,
    active : true
  },
  {
    title : "Beginning development of Hail The King!  see github at <a href='http://google.com' target='_blank'>the official repo</a> ",
    date : 1405811815702,
    active : true
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    gold: 100,
    towns: 3,
    population: 400
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    gold: 200,
    towns: 2,
    population: 599
  }, function() {
      console.log('finished populating users');
    }
  );
});

Town.find({}).remove(function() {
  Town.create({
    name : 'ButtsVille',
    position: {
      x: .1,
      y: .1
    },
    population : 50,
    structures: {
      townHall: 1,
      barracks: 1
    },
    active: true
  }, {
    name : 'Asston',
    position: {
      x: .2,
      y: .2
    },
    population : 100,
    structures: {
      townHall: 1,
      barracks: 1
    },
    active: true
  });
});