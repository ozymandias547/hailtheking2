'use strict';

angular.module('hailTheKing2App')
	.factory('Map', function($resource) {
		return {
			initializeMap: function() {

				var mapElement = document.getElementById('map'),
					stage = new PIXI.Stage(0x97c56e, true),
					renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
					texture = PIXI.Texture.fromImage("/assets/images/motte-bailey.png"),
					tilingSprite = new PIXI.TilingSprite(texture, window.innerWidth, window.innerHeight);

				document.getElementById('map').appendChild(renderer.view)

				requestAnimFrame(animate);

				createTown(Math.random() * window.innerWidth, Math.random() * window.innerHeight)

				function createTown(x, y) {


					var town = new PIXI.Sprite(texture);
					
					// enable the town to be interactive.. this will allow it to respond to mouse and touch events   
					town.interactive = true;

					// this button mode will mean the hand cursor appears when you rollover the town with your mouse
					town.buttonMode = true;

					// center the towns anchor point
					town.anchor.x = 0.5;
					town.anchor.y = 0.5;

					// scale the town based upon population.
					town.scale.x = town.scale.y = 1;

					// use the mousedown and touchstart
					town.mousedown = town.touchstart = function(data) {
						// data.originalEvent.preventDefault()
						// store a refference to the data
						// The reason for this is because of multitouch
						// we want to track the movement of this particular touch
						this.data = data;
						this.alpha = 0.9;
						this.dragging = true;
					};

					// set the events for when the mouse is released or a touch is released
					town.mouseup = town.mouseupoutside = town.touchend = town.touchendoutside = function(data) {
						this.alpha = 1
						this.dragging = false;
						// set the interaction data to null
						this.data = null;
					};

					// set the callbacks for when the mouse or a touch moves
					town.mousemove = town.touchmove = function(data) {
						if (this.dragging) {
							// need to get parent coords..
							var newPosition = this.data.getLocalPosition(this.parent);
							this.position.x = newPosition.x;
							this.position.y = newPosition.y;
						}
					}

					// move the sprite to its designated position
					town.position.x = x;
					town.position.y = y;

					// add it to the stage
					stage.addChild(town);
				}

				function animate() {
					requestAnimFrame(animate);
					renderer.render(stage);
				}

			}
		};
	});