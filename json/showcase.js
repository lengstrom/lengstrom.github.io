var showCase = [
	{
		"title": "Hextris",
		"date": "July 28, 2014",
		"src": "/img/hextris.png",
		"url": "/projects/hextris",
		"target": "projects"
	},
	{
		"title": "Problematic Particles",
		"date": "April 26, 2014",
		"src": "/img/pp.png",
		"url": "/projects/problematicparticles",
		"target": "projects"
	},
	{
		"title": "iPass",
		"date": "March 14, 2013",
		"src": "/img/ipass.png",
		"url": "/projects/ipass.png",
		"target": "projects"
	},
	{
		"title": "Dangerous Chef Pioneer",
		"date": "December 20, 2013",
		"src": "/img/dcp.png",
		"url": "/projects/dcp",
		"target": "projects"
	},
	{
		"title": "Pyramid Simulator",
		"date": "November 21, 2013",
		"src": "/img/pyramid.png",
		"url": "http://github.com/meadowstream/pyramidsimulator",
		"target": "projects"
	},
	{
		"title": "Derp Space 9",
		"date": "September 13, 2013",
		"src": "/img/ds9.png",
		"url": "http://js13kgames.com/entries/derpspacenine",
		"target": "projects"
	},
	{
		"title": "Math Evaluator (Sublime Text plugin)",
		"date": "January 13, 2014",
		"src": "/img/math_evaluator.gif",
		"url": "https://sublime.wbond.net/packages/Selection%20Evaluator",
		"target": "projects"
	},	
]

showCase = showCase.sort(function(a,b) {
	return new Date(b.date) - new Date(a.date);
});