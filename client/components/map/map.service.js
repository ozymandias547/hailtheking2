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
					armyTexture = PIXI.Texture.fromImage("/assets/images/army.jpg"),
					tilingSprite = new PIXI.TilingSprite(townTexture, window.innerWidth, window.innerHeight),
					then = Date.now();

				document.getElementById('map').appendChild(renderer.view)

				game.getAll('armies').forEach(function(army) {
					createSprite({
						element: army,
						x: army.x,
						y: army.y,
						scale: function() {
							return .001 * army.size;
						},
						texture : armyTexture,
						interactive : true,
						onclick: function(e) { 
							console.log('clicked on army #' + army.id); 
						}
					});
				});

				game.getAll('towns').forEach(function(town) {
					createSprite({
						element: town,
						x: town.x,
						y: town.y,
						scale: function() {
							return .01 * town.population;
						}, 
						texture : townTexture,
						interactive : true,
						onclick: function(e) { 
							console.log(e);
							console.log('clicked on town #' + town.id); 
						}
					});
				});

				game.getAll('caves').forEach(function(cave) {
					createSprite({
						element: cave,
						x: cave.x,
						y: cave.y,
						scale: function() {
							return .1;
						},
						texture : caveTexture,
						interactive : true,
						onclick: function(e) { 
							console.log('clicked on cave #' + cave.id); 
						}
					});
				});

				requestAnimFrame(animate);

				function createSprite(newObject) {

					// TODO: add some null checks just in case...

					var mySprite = new PIXI.Sprite(newObject.texture);

					// enable the town to be interactive.. this will allow it to respond to mouse and touch events   					
					if (newObject.interactive) {
						mySprite.interactive = true;
						mySprite.buttonMode = true;
					}
					
					// center the towns anchor point
					mySprite.anchor.x = 0.5;
					mySprite.anchor.y = 0.5;

					// scale the town based upon scaling function.
					mySprite.scale.x = mySprite.scale.y = newObject.scale();

					mySprite.mousedown = newObject.onclick;

					mySprite.position.x = worldToViewportX(newObject.x);
					mySprite.position.y = worldToViewportY(newObject.y);

					newObject.element.sprite = mySprite;

					// add it to the stage
					stage.addChild(mySprite);
				};


				function animate() {
					var now = Date.now();

					requestAnimFrame(animate);
					
					game.onTick(now - then);

					game.getAll('armies').forEach(function(army) {
						army.sprite.position.x = worldToViewportX(army.x);
						army.sprite.position.y = worldToViewportY(army.y);
					});

					renderer.render(stage);
						
					then = now;
				};

				function worldToViewportX(worldX) {
					return worldX;
				};

				function worldToViewportY(worldY) {
					return worldY;
				};

			}
		};
	});