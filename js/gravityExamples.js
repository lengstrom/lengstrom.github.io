window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
	};
})();

function addLine(stage) {
	stages[stage + 'g'].line = new PIXI.Graphics();
	stages[stage + 'g'].stage.addChild(stages[stage + 'g'].line);
}

var stages = {
	'ng': {
		i: 0,
		ct: 0,
		renderer: 0,
		stage: 0,
		active: 0,
		running: 0,
		particles: [],
		wells: [{
			x: 250,
			y: 200,
			negative: 0,
			mass: 200,
			gfx: 0
		}]
	},
	'ngg': {
		renderer: 0,
		stage: 0,
		fractional: 0,
		points: [/*[t,ax]*/],
		line: 0
	},
	'cg': {
		i: 0,
		ct: 0,
		renderer: 0,
		stage: 0,
		active: 0,
		running: 0,
		particles: [],
		wells: []
	},
	'cgg': {
		renderer: 0,
		stage: 0,
		fractional: 0,
		points: [/*[t,ax]*/],
		line: 0
	}
};

var cClick = {
	oPos:-1,
	well:-1,
	stage:''
};

var mousedown = {
	down:0,
	ct:0,
	x:0,
	y:0
};

document.addEventListener('mousedown', function(e){
	for (var zz in stages.ng.wells) {
		var ry = document.getElementById('normalgravity').getBoundingClientRect()['top'] + stages.ng.wells[zz].y;
		var rx = document.getElementById('normalgravity').getBoundingClientRect()['left'] + stages.ng.wells[zz].x;
		var dist = Math.pow((rx - e.x) * (rx - e.x) + (ry - e.y) * (ry - e.y),0.5);
		if (dist < 40) {
			cClick.oPos = {x:e.x, y:e.y};
			cClick.well = zz;
			cClick.stage = 'ng';
			break;
		}
	}

	for (var zz in stages.cg.wells) {
		var ry = document.getElementById('changedgravity').getBoundingClientRect()['top'] + stages.cg.wells[zz].y;
		var rx = document.getElementById('changedgravity').getBoundingClientRect()['left'] + stages.cg.wells[zz].x;
		var dist = Math.pow((rx - e.x) * (rx - e.x) + (ry - e.y) * (ry - e.y),0.5);
		if (dist < 40) {
			cClick.oPos = {x:e.x, y:e.y};
			cClick.well = zz;
			cClick.stage = 'cg';
			break;
		}
	}
});

document.getElementById('changedgravity').addEventListener('mousedown',function(e) {
	mousedown.down = 1;
	mousedown.ct = 0;
	mousedown.stage = 'cg';
});

document.getElementById('changedgravity').addEventListener('mouseup',function(e) {
	mousedown.down = 0;
});

document.getElementById('normalgravity').addEventListener('mousedown',function(e) {
	mousedown.down = 1;
	mousedown.ct = 0;
	mousedown.stage = 'ng';
});

document.getElementById('normalgravity').addEventListener('mouseup',function(e) {
	mousedown.down = 0;
});

document.addEventListener('mousemove', function(e){
	if (cClick.oPos != -1) {
		var d = {x:e.x - cClick.oPos.x, y:e.y - cClick.oPos.y};
		stages[cClick.stage].wells[cClick.well].x += d.x;
		stages[cClick.stage].wells[cClick.well].y += d.y;
		stages[cClick.stage].wells[cClick.well].gfx.position.x += d.x;
		stages[cClick.stage].wells[cClick.well].gfx.position.y += d.y;
		cClick.oPos.x += d.x;
		cClick.oPos.y += d.y;
		return;
	}

	for (var zz in stages.ng.wells) {
		var ry = document.getElementById('normalgravity').getBoundingClientRect()['top'] + stages.ng.wells[zz].y;
		var rx = document.getElementById('normalgravity').getBoundingClientRect()['left'] + stages.ng.wells[zz].x;
		var dist = Math.pow((rx - e.x) * (rx - e.x) + (ry - e.y) * (ry - e.y), 0.5);
		if (dist < 40) {
			document.body.style.cursor = 'pointer';
			return;
		}
	}

	for (var zz in stages.cg.wells) {
		var ry = document.getElementById('changedgravity').getBoundingClientRect()['top'] + stages.cg.wells[zz].y;
		var rx = document.getElementById('changedgravity').getBoundingClientRect()['left'] + stages.cg.wells[zz].x;
		var dist = Math.pow((rx - e.x) * (rx - e.x) + (ry - e.y) * (ry - e.y),0.5);
		if (dist < 40) {
			document.body.style.cursor = 'pointer';
			return;
		}
	}

	mousedown.x = e.x;
	mousedown.y = e.y;

	document.body.style.cursor = '';
});

document.addEventListener('mouseup', function(e){
	document.body.style.cursor = '';
	cClick.oPos = -1;
	cClick.well = -1;
	cClick.stage = '';
	mousedown.down = 0;
});

stages.ng.stage = new PIXI.Stage(0x232323);
stages.ngg.stage = new PIXI.Stage(0x232323);
stages.ng.renderer = PIXI.autoDetectRenderer(500, 400, document.getElementById("normalgravity"), false, true);
stages.ngg.renderer = PIXI.autoDetectRenderer(500, 200, document.getElementById("normalgravity_graph"), false, true);
stages.cg.stage = new PIXI.Stage(0x232323);
stages.cgg.stage = new PIXI.Stage(0x232323);
stages.cg.renderer = PIXI.autoDetectRenderer(500, 400, document.getElementById("changedgravity"), false, true);
stages.cgg.renderer = PIXI.autoDetectRenderer(500, 200, document.getElementById("changedgravity_graph"), false, true);

addLine('ng');
addLine('cg');

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addGWell(stage,x,y,mass,random) {
	if (random == 1) {
		y = getRandomInt(100,400);
		x = getRandomInt(100,400);
	}
	stages[stage].wells.push({
		x:x,
		y:y,
		negative:0,
		mass:mass,
		gfx:0
	});
	var gwell = new PIXI.Graphics();
	gwell.beginFill(0x18bc9c);
	// gwell.drawCircle(250,200,40);
	gwell.drawCircle(x,y,mass * 0.2);
	stages[stage].stage.addChild(gwell);
	stages[stage].wells[stages[stage].wells.length - 1].gfx = gwell;
}

addGWell('ng',250,200,200);
addGWell('cg',250,200,200);

function startStage(stage) {
	stages[stage].running = 1;
}

requestAnimFrame(animate);

function restartStage(stage) {
	stages[mousedown.stage].ct = 0;
	stages[mousedown.stage].i = 0;
	stages[mousedown.stage + 'g'].points = [];
	stages[mousedown.stage + 'g'].line.clear();
}

function animate() {
	if (mousedown.down) {
		if (mousedown.ct % 10 === 0 && stages[mousedown.stage].i > 5 && cClick.oPos == -1) {
			var cStage = mousedown.stage == 'cg' ? 'changedgravity' : 'normalgravity';
			var px = mousedown.x - document.getElementById(cStage).getBoundingClientRect().left;
			var py = mousedown.y - document.getElementById(cStage).getBoundingClientRect().top;
			stages[mousedown.stage].particles[stages[mousedown.stage].i] = new particle(px, py, 0, 0);
			var graphics = new PIXI.Graphics();
			graphics.beginFill(0xFDEE00);
			graphics.drawCircle(0,0,4);
			stages[mousedown.stage].stage.addChild(graphics);

			stages[mousedown.stage].particles[stages[mousedown.stage].active].gfx.clear();
			stages[mousedown.stage].particles[stages[mousedown.stage].active].gfx.beginFill(0xDCDCDC);
			stages[mousedown.stage].particles[stages[mousedown.stage].active].gfx.drawCircle(0,0,4);
			stages[mousedown.stage].ct = 0;
			stages[mousedown.stage + 'g'].points = [];
			stages[mousedown.stage + 'g'].line.clear();
			stages[mousedown.stage].active = stages[mousedown.stage].particles.length - 1;
			stages[mousedown.stage].particles[stages[mousedown.stage].i].gfx = graphics;
			stages[mousedown.stage].i++;
		}
		mousedown.ct++;
	}

	for (var s in stages) {
		if (s.length == 2) {
			if (stages[s].running) {
				if (stages[s].i < 6) {
					if (stages[s].ct % 30 === 0) {
						var num = s == 'cg' ? 1/5 : 1/10;
						stages[s].particles[stages[s].i] = new particle(175, 125, num, -num);
						var graphics = new PIXI.Graphics();
						if (stages[s].i === 0) {
							graphics.beginFill(0xFDEE00);
							stages[s].active = 0;
						}
						else {
							graphics.beginFill(0xDCDCDC);
						}
						graphics.drawCircle(0,0,4);
						stages[s].stage.addChild(graphics);
						stages[s].particles[stages[s].i].gfx = graphics;
						stages[s].i++;
					}

					if ((stages[s].ct + 15) % 30 === 0) {
						var num = s == 'cg' ? 1 : 2;
						stages[s].particles[stages[s].i] = new particle(175, 125, num, -num);
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0x32CD32);
						graphics.drawCircle(0,0,4);
						stages[s].stage.addChild(graphics);
						stages[s].particles[stages[s].i].gfx = graphics;
						stages[s].i++;
					}

					if (stages[s].i === 0) {
						stages[s].particles[0].selected = 1;
					}
				}
			}

			if (stages[s].running) {
				for (var p = 0; p < stages[s].particles.length; p++) {
					for (var g in stages[s].wells) {
						var dx = stages[s].wells[g].x - stages[s].particles[p].x;
						var dy = stages[s].wells[g].y - stages[s].particles[p].y;
						var distsqr = (dx * dx + dy * dy);
						if (distsqr !== 0) {
							if (s == 'cg') {
								var F = (stages[s].wells[g].mass + 1)/(Math.pow(distsqr + stages[s].wells[g].mass + 1,1.5));
								stages[s].particles[p].ax += F * dx * 10;
								stages[s].particles[p].ay += F * dy * 10;
							}
							else {
								var F = (stages[s].wells[g].mass * 6.67384 * Math.pow(10,-11))/distsqr;
								stages[s].particles[p].ax += F * dx * 500000000;
								stages[s].particles[p].ay += F * dy * 500000000;
							}
						}
					}
				}
				stages[s + 'g'].points.push([stages[s].ct,200 - Math.pow(stages[s].particles[stages[s].active].ax * stages[s].particles[stages[s].active].ax + stages[s].particles[stages[s].active].ay * stages[s].particles[stages[s].active].ay,0.5) * 14]);
				stages[s].ct++;

				for (var p in stages[s].particles) {
					stages[s].particles[p].vx += stages[s].particles[p].ax;
					stages[s].particles[p].ax = 0;
					stages[s].particles[p].vy += stages[s].particles[p].ay;
					stages[s].particles[p].ay = 0;
				}

				for (var p in stages[s].particles) {
					stages[s].particles[p].x += stages[s].particles[p].vx;
					stages[s].particles[p].y += stages[s].particles[p].vy;
					stages[s].particles[p].gfx.position.x = stages[s].particles[p].x;
					stages[s].particles[p].gfx.position.y = stages[s].particles[p].y;
				}

				if (stages[s + 'g'].points.length > 500) {
					stages[s + 'g'].points.splice(0, 1);
					stages[s].ct--;
					for (var j in stages[s + 'g'].points) {
						stages[s + 'g'].points[j][0] = stages[s + 'g'].points[j][0] - 1;
					}
				}

				stages[s + 'g'].line.clear();
				stages[s + 'g'].line.lineStyle(2,0xFDEE00);
				stages[s + 'g'].line.moveTo(stages[s + 'g'].points[0][0],stages[s + 'g'].points[0][1]);
				for (var t = 1; t < stages[s + 'g'].points.length; t++) {
					stages[s + 'g'].line.lineTo(stages[s + 'g'].points[t][0],stages[s + 'g'].points[t][1]);
				}
			}

			stages[s + 'g'].renderer.render(stages[s + 'g'].stage);
			stages[s].renderer.render(stages[s].stage);
		}
	}

	requestAnimFrame(animate);
}

function particle(x, y, vx, vy) {
	this.vx = vx;//1;
	this.vy = vy;//-1;
	this.ax = 0;
	this.ay = 0;
	this.x = x;
	this.y = y;
	this.selected = 0;
	this.gfx = 0;
}