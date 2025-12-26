// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { exec } = require('child_process');

function main() {
	const thisScriptPath = process.argv[1];
	const thisPackageJsonPath = path.join(
		path.dirname(thisScriptPath),
		'..',
		'package.json'
	);
	const thisPackageJson = JSON.parse(
		fs.readFileSync(thisPackageJsonPath, 'utf-8')
	);
	
	const dependencies = Object.entries(thisPackageJson.dependencies).map(
		([packageName, version]) => `${packageName}@${version}`
	);
	const command = `npm install --save ${dependencies.join(' ')}`;
	
	const devDependencies = ["babel-plugin-module-resolver@^5.0.2"]
	const devCommand = `npm install --save-dev ${devDependencies.join(' ')}`;

	console.log("How to install dependencies:");
	console.log();
	console.log(`  ${command}`);
	console.log(`  ${devCommand}`);
	console.log();
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question(`Run now? (Y/n)`, (answer) => {
		if (['y', ''].includes(answer.toLowerCase())) {
			console.log('-'.repeat(40));
			(async () => {
				await shell(command)
				await shell(devCommand)
			})();
		}
		rl.close();
	});
}

function shell(command) {
	return new Promise((resolve) => {
		exec(command, (error, stdout, stderr) => {
			console.log(stdout);
			if (error) {
				console.error(`Error executing command: ${error.message}`);
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
			}
			resolve();
		});
	});
}

main();