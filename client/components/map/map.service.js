'use strict';

angular.module('hailTheKing2App')
	.factory('Map', function($resource) {
		return {
			initializeMap: function() {

				var Viewport = {
					offset: {
						x: 0,
						y: 0
					},
					zoom: 1
				}

				var Navigator = {
					x: 0,
					y: 0,
					isDragging : false
				}

				var PIXI_utils = {
					createSprite : function(newObject, scene) {

						// TODO: add some null checks just in case...

						var mySprite = new PIXI.Sprite(newObject.texture);

						// enable the object to be interactive.. this will allow it to respond to mouse and touch events   					
						if (newObject.interactive) {
							mySprite.interactive = true;
							mySprite.buttonMode = true;
						}
						
						// center the objects anchor point
						mySprite.anchor.x = 0.5;
						mySprite.anchor.y = 0.5;

						// scale the object based upon scaling function. (allows to scale against population of towns etc.)
						mySprite.scale.x = mySprite.scale.y = newObject.scale();

						mySprite.mousedown = newObject.onclick;

						mySprite.position.x = newObject.x;
						mySprite.position.y = newObject.y;

						newObject.element.sprite = mySprite;

						// add sprite to the scene container
						scene.addChild(mySprite);
					}
				}

				var canvasElement = document.getElementById('map'),
					stage = new PIXI.Stage(0x97c56e),
					scene = new PIXI.DisplayObjectContainer(0x97c56e),
					renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null),
					townTexture = PIXI.Texture.fromImage("/assets/images/motte-bailey.png"),
					caveTexture = PIXI.Texture.fromImage("/assets/images/cave.png"),
					armyTexture = PIXI.Texture.fromImage("/assets/images/army.jpg"),
					then = Date.now()

				canvasElement.appendChild(renderer.view)
				buildInitialObjects();
				stage.addChild(scene);
				requestAnimFrame(animate);


				function buildInitialObjects() {
					game.getAll('armies').forEach(function(army) {
						PIXI_utils.createSprite({
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
						}, scene);
					});

					game.getAll('towns').forEach(function(town) {
						PIXI_utils.createSprite({
							element: town,
							x: town.x,
							y: town.y,
							scale: function() {
								return .01 * town.population;
							}, 
							texture : townTexture,
							interactive : true,
							onclick: function(e) { 
								Viewport.zoom += .01;
								console.log('clicked on town #' + town.id); 
							}
						}, scene);
					});

					game.getAll('caves').forEach(function(cave) {
						PIXI_utils.createSprite({
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
						}, scene);
					});
				};

				function animate() {
					var now = Date.now();

					requestAnimFrame(animate);
					
					game.onTick(now - then);

					game.getAll('armies').forEach(function(army) {
						army.sprite.position.x = army.x;
						army.sprite.position.y = army.y;
					});

					scene.position.x = Viewport.offset.x;
					scene.position.y = Viewport.offset.y;

					scene.scale.x = Viewport.zoom;
					scene.scale.y = Viewport.zoom;

					renderer.render(stage);
						
					then = now;
				};

				function rendererResize() {					
					canvasElement.width = window.innerWidth;
					canvasElement.height = window.innerHeight;

					renderer.resize(canvasElement.width, canvasElement.height);
				}

				var clickStartTime = null;
				var previousTap = null;

				stage.mousedown = function(e) {
					Navigator.isDragging = true;
					Navigator.x = e.originalEvent.offsetX;
					Navigator.y = e.originalEvent.offsetY;
					clickStartTime = Date.now();
				}

				stage.mousemove = function(e) {
					if (Navigator.isDragging) {
						Viewport.offset.x -= Navigator.x - e.originalEvent.offsetX;
						Viewport.offset.y -= Navigator.y - e.originalEvent.offsetY;

						Navigator.x = e.originalEvent.offsetX;
						Navigator.y = e.originalEvent.offsetY;
					}
				}

				stage.mouseup = function(e) {
					
					var now = Date.now();
					var clickTime = now - clickStartTime;

					Navigator.isDragging = false;

					if (now - previousTap < 200) {
						this.doubletap(e);
					}

					if (clickTime < 200) {
						previousTap = now;
						this.tap(e);
					}
				}

				stage.tap = function(e) {
					// console.log("tap");
				}

				stage.doubletap = function(e) {
					console.log(e);
					centerViewportOnCoord(e.originalEvent.offsetX, e.originalEvent.offsetY);
				}

				function centerViewportOnCoord(x, y) {
					Viewport.offset.x += window.innerWidth / 2 - x;
					Viewport.offset.y += window.innerHeight / 2 - y;
				}

				function zoomIn(degree, e) {
					Viewport.zoom += .1;
					Viewport.offset.x += window.innerWidth / 2;
					Viewport.offset.y += window.innerHeight / 2;
				}

				document.addEventListener('keydown', function(e) {
					if (e.shiftKey && e.keyCode == 187) {
						zoomIn(.1);
					} 
					else if (e.shiftKey && e.keyCode == 189) {
						Viewport.zoom -= .1;
					}
				});

			    window.addEventListener('resize', rendererResize);
			    window.addEventListener('deviceOrientation', rendererResize);


			}
		};
	});