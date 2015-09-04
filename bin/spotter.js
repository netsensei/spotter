#! /usr/bin/env node
var program = require('commander');
var spotter = require('../lib/spotter.js');

program
	.version('0.1.0')
	.option('-c, --column <value>', 'The column that needs to be parsed.')
	.action(function (csvFile) {;
		var column = (program.column == undefined) ? null : program.column;
		console.log("Fetching HTTP codes for, %s in %s...", column, csvFile);
		spotter(csvFile, column);
	});

program.parse(process.argv);
