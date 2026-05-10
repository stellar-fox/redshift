import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const frontendPkgPath = path.resolve('frontend/package.json');
const versionTsPath = path.resolve('frontend/src/version.ts');

// Read current version
const pkg = JSON.parse(fs.readFileSync(frontendPkgPath, 'utf8'));
const currentVersion = pkg.version;

// Get last commit message
const lastCommit = execSync('git log -1 --pretty=%B').toString().trim();

let type = 'patch';
if (lastCommit.includes('BREAKING CHANGE') || lastCommit.includes('!')) {
    type = 'major';
} else if (lastCommit.startsWith('feat')) {
    type = 'minor';
}

console.log(`Determined version bump type: ${type} based on commit: "${lastCommit}"`);

// Bump version
execSync(`npm version ${type} --no-git-tag-version`, { cwd: 'frontend' });

// Get new version
const newPkg = JSON.parse(fs.readFileSync(frontendPkgPath, 'utf8'));
const newVersion = newPkg.version;

// Update version.ts
fs.writeFileSync(versionTsPath, `export const version = "${newVersion}"\n`);

console.log(`Bumped version from ${currentVersion} to ${newVersion}`);
