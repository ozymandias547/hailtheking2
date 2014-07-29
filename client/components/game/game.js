
var Game = function(options) {
	this.init(options);
}

Game.prototype = {
	
	init: function(options) {
		
		// 0 - no debugging. just fatal errors.
		// 1 - shows warnings;
		// 2 - show warnings and all processes
		// 3 - WAYYY too much loggin
		
		var defaults = {
			gameName : "game",
			debugLevel : 1
		}

		this.settings = {};
		this.options = _.extend(this.settings, defaults, options);

		// POJO cache that will exist on both client and server; 
		this.cache = {
			
			towns : [{
				id: 1,
				name: "myTownA",
				x: 100,
				y: 300,
				population: 50,
				ownerId: 123
			}, {
				id: 2,
				name: "myTownB",
				x: 400,
				y: 200,
				population: 100,
				ownerId: 456
			}],

			caves: [{
				id: 1,
				x: 300,
				y: 400,
			},{
				id: 2,
				x: 600,
				y: 600,
			}],

			armies: [{
				id: 1,
				x: 150,
				y: 150,
				size: 100
			},
			{
				id: 2,
				x: 250,
				y: 150,
				size: 200
			}]
		};

		window[this.settings.name] = this;

		this.log("initializing game object.", 2	)
	},

	onTick: function(elapsedTime) {
		
		this.cache.armies.forEach(function(army) {
			army.x += .01 * elapsedTime;
			army.y += .01 * elapsedTime;
		});

	},

	syncGameCache: function() {

	},

	/* getValue - gets an array of a collection where a field matches a value
	** example - game.getValue('towns', 'ownerId', 123);  Get's an array of towns where owner is id 123.
	*/

	getWhere: function(collection, field, value) {

		if (typeof collection === "undefined") {
			this.log('getValues method needs a collection', 1);
			return null;
		}

		if (typeof field === "undefined") {
			warning('getValues method needs a field', 1);
			return null;
		}

		if (typeof value === "undefined") {
			warning('getValues method needs a value', 1);
			return null;
		}

		return this.cache[collection].filter(function(object) {
			return object[field] === value ? object : null;
		});
	},
	
	getAll: function(collection) {
		return this.cache[collection];
	},

	log: function(message, level) {
		if (this.settings.debugLevel >= level)
			console.log(message);
	}
}

new Game({
	name : "game",
	debugLevel: 2
});