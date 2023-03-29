'use strict';
const path = require('path');
const fs = require('fs');

const dest = process.argv[2];
const source = path.resolve(path.sep, process.argv[3] || path.join(__dirname, 'sqlite3'));
const files = [
	{ filename: 'sqlite3.c', optional: false },
	{ filename: 'sqlite3.h', optional: false },
];

for (const { filename, optional } of files) {
	if (optional && !fs.existsSync(path.join(source, filename))) {
		continue;
	}
	fs.accessSync(path.join(source, filename));
	fs.copyFileSync(path.join(source, filename), path.join(dest, filename));
}
