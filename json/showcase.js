var showCase = [
	{
		"title":"<b>Hextris</b>: A critically acclaimed puzzle game (now played by over 800,000 people!)",
		"date":"July 28, 2014",
		"src":"/img/hextris.png",
		"url":"http://hextris.github.io/",
		"target":"projects"
	},
	{
		"title":"<b>Problematic Particles</b>: An iOS puzzle game",
		"date":"April 26, 2014",
		"src":"/img/pp.png",
		"url":"https://itunes.apple.com/us/app/problematic-particles/id866941631?mt=8",
		"target":"projects"
	},
	{
		"title":"<b>iPass Mobile</b>: A mobile version of my high school's scheduling system",
		"date":"March 14, 2013",
		"src":"/img/ipass.png",
		"url":"https://itunes.apple.com/us/app/lsrhs-schedule/id926159436?mt=8",
		"target":"projects"
	},
	{
		"title":"<b>Dangerous Chef Pioneer</b>: GitHub Game Off 2013 entry",
		"date":"December 20, 2013",
		"src":"/img/dcp.png",
		"url":"https://github.com/meadowstream/Dangerous-Chef-Pioneer",
		"target":"projects"
	},
	{
		"title":"<b>Pyramid Simulator</b>: A history project",
		"date":"November 21, 2013",
		"src":"/img/pyramid.png",
		"url":"http://github.com/meadowstream/pyramidsimulator",
		"target":"projects"
	},
	{
		"title":"<b>Derp Space 9</b>: JS13k 2013 entry",
		"date":"September 13, 2013",
		"src":"/img/ds9.png",
		"url":"http://js13kgames.com/entries/derpspacenine",
		"target":"projects"
	},
	{
		"title":"<b>Math Evaluator</b>: A Sublime Text plugin",
		"date":"January 13, 2014",
		"src":"/img/math_evaluator.gif",
		"url":"https://sublime.wbond.net/packages/Selection%20Evaluator",
		"target":"projects"
	},{
		"title":"<b>Flare</b>: Top 10 & \"Best iOS App\" @ <a href='http://2014f.pennapps.com'>PennApps</a>",
		"date":"September 15, 2014",
		"src":"/img/flare.png",
		"url":"http://challengepost.com/software/flare-tm5n9",
		"target":"projects"
	},{
		"title":"<b>Radial</b>: 7th place @ <a href='http://js13kgames.com'>JS13k 2014</a>",
		"date":"September 13, 2014",
		"src":"/img/radial.png",
		"url":"https://github.com/meadowstream/Radial",
		"target":"projects"
	},{
		"title":"<b>CodeZoo</b>: An online IDE for beginner programmers",
		"date":"August 20, 2014",
		"src":"/img/codezoo.png",
		"url":"https://github.com/meadowstream/codezoo",
		"target":["projects"]
	},{
		"title":"<b>CodeZoo</b>: An online IDE for beginner programmers",
		"date":"August 20, 2014",
		"src":"/img/codezoo.png",
		"url":"https://github.com/meadowstream/codezoo",
		"target":"education"
	},{
		"title":"<b>Computational Genomics Research</b>: Coming soon!",
		"date":"2014 - 2015",
		"src":"/img/csail.png",
		"url":"http://www.psrg.csail.mit.edu/",
		"target":"research"
	},{
		"title":"<b>Trustee</b>: Offline docs management",
		"date":"April 6, 2014",
		"src":"/img/trustee.png",
		"url":"https://github.com/meadowstream/trustee",
		"target":"projects"
	},{
		"title":"<b>LexHack</b>: A hackathon for high schoolers",
		"date":"September 27, 2014",
		"src":"/img/lexhack.png",
		"url":"http://lexhack.org/",
		"target":"education"
	},{
		"title":"<b>A Fun Gravity</b>",
		"date":"April 20, 2014",
		"src":"/img/grav.png",
		"url":"http://loganengstrom.herokuapp.com/articles/gravity.html",
		"target":"articles"
	}
]

showCase = showCase.sort(function(a,b) {
	return new Date(b.date) - new Date(a.date);
});
