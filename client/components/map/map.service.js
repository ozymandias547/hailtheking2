'use strict';

angular.module('hailTheKing2App')
	.factory('Map', function($resource) {
		return {
			initializeMap: function() {

				var mapElement = document.getElementById('map'),
					stage = new PIXI.Stage(0x97c56e, true),
					renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
					townTexture = PIXI.Texture.fromImage("/assets/images/motte-bailey.png"),
					caveTexture = PIXI.Texture.fromImage("/assets/images/cave.png"),
					tilingSprite = new PIXI.TilingSprite(townTexture, window.innerWidth, window.innerHeight);

				document.getElementById('map').appendChild(renderer.view)

				requestAnimFrame(animate);

				game.getAll('towns').forEach(createTown);
				game.getAll('caves').forEach(createCave);

				function createTown(newTown) {

					var town = new PIXI.Sprite(townTexture);
					
					// enable the town to be interactive.. this will allow it to respond to mouse and touch events   
					town.interactive = true;

					// this button mode will mean the hand cursor appears when you rollover the town with your mouse
					town.buttonMode = true;

					// center the towns anchor point
					town.anchor.x = 0.5;
					town.anchor.y = 0.5;

					// scale the town based upon population.
					town.scale.x = town.scale.y = .5;

					town.mousedown = town.touchstart = function(data) {
						console.log("clicked on town #" + newTown.id)
					};

					// move the sprite to its designated position
					town.position.x = newTown.x;
					town.position.y = newTown.y;

					// add it to the stage
					stage.addChild(town);
				}

				function createCave(newCave) {

					var cave = new PIXI.Sprite(caveTexture);
					
					// enable the town to be interactive.. this will allow it to respond to mouse and touch events   
					cave.interactive = true;
					cave.buttonMode = true;

					// center the towns anchor point
					cave.anchor.x = 0.5;
					cave.anchor.y = 0.5;

					// scale the town based upon population.
					cave.scale.x = cave.scale.y = .1;

					cave.mousedown = cave.touchstart = function(data) {
						console.log("clicked on the cave.")
					};

					// move the sprite to its designated position
					cave.position.x = newCave.x;
					cave.position.y = newCave.y;

					// add it to the stage
					stage.addChild(cave);
				}

				function animate() {
					requestAnimFrame(animate);
					renderer.render(stage);
				}

			}
		};
	});