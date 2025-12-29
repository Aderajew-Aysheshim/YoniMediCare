const { spawnSync } =require('child_process');
const path = require('path');
const ARGV = process.argv.slice(2);
const PREVIEW = ARGV.includes('--preview') || ARGV.includes('-p');
const AUTO = ARGV.includes('--yes') || ARGV.includes('-y') || ARGV.includes('--auto');

function run(cmd, args, opts = {}) {
    const r = spawnSync(cmd, args, { stdio: 'pipe', encoding: 'utf8', ...opts });
    return { code: r.status, stdout: r.stdout, stderr: r.stderr };
}

// Get porcelain status
const gitStatus = run('git', ['status', '--porcelain', '--untracked-files=all']);
if (gitStatus.code !== 0) {
    console.error('Failed to run git status:', gitStatus.stderr);
    process.exit(1);
}

const lines = gitStatus.stdout.split('\n').map(l => l.trim()).filter(Boolean);
const pagePath = path.posix.join('client', 'src', 'pages') + '/';

const changed = [];
for (const line of lines) {
    // format: XY filename or ?? filename
    const file = line.slice(3).trim();
    if (file.startsWith(pagePath)) changed.push(file);
}

if (changed.length === 0) {
    console.log('No changes found under client/src/pages.');
    process.exit(0);
}

console.log('Detected page changes:');
changed.forEach(f => console.log('  -', f));

if (PREVIEW) {
    console.log('\nPreview mode only; no commit/push will be performed.');
    process.exit(0);
}

if (!AUTO) {
    console.log('\nRun with --yes to auto-stage, commit and push.');
    process.exit(0);
}

// Stage files
const addRes = run('git', ['add', '--', ...changed]);
if (addRes.code !== 0) {
    console.error('git add failed:', addRes.stderr);
    process.exit(1);
}

// Commit message
const fileNames = changed.map(f => f.replace(/^client\/src\/pages\//, '')).join(', ');
const message = `chore(pages): update ${fileNames}`;

const commitRes = run('git', ['commit', '-m', message]);
if (commitRes.code !== 0) {
    if (commitRes.stderr.includes('nothing to commit')) {
        console.log('Nothing to commit (changes may already be staged).');
    } else {
        console.error('git commit failed:', commitRes.stderr);
        process.exit(1);
    }
}

console.log('Committed with message:', message);

// Push
const pushRes = run('git', ['push', 'origin', 'main']);
if (pushRes.code !== 0) {
    console.error('git push failed:', pushRes.stderr);
    process.exit(1);
}

console.log('Pushed changes to origin/main successfully.');