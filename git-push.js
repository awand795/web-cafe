const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const REPO_PATH = 'C:\\Project\\Web\\Bikin-Cafe';
const REMOTE_URL = 'https://github.com/awand795/web-cafe.git';
const GIT_BINARY = 'C:\\Program Files\\Git\\bin\\git.exe';

async function main() {
  const git = simpleGit(REPO_PATH, { binary: GIT_BINARY, unsafe: { allowUnsafeCustomBinary: true } });

  // Check if .git already exists
  const gitDir = path.join(REPO_PATH, '.git');
  const isRepo = fs.existsSync(gitDir);

  if (!isRepo) {
    console.log('📁 Initializing git repository...');
    await git.init();
    console.log('✅ Git repository initialized.');
  } else {
    console.log('✅ Git repository already initialized.');
  }

  // Create .gitignore if it doesn't exist
  const gitignorePath = path.join(REPO_PATH, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log('📝 Creating .gitignore...');
    const gitignoreContent = `node_modules/
.env
backend/vendor/
backend/storage/
backend/.env
frontend/dist/
.DS_Store
*.log
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('✅ .gitignore created.');
  } else {
    console.log('✅ .gitignore already exists.');
  }

  // Check if remote already exists
  try {
    const remotes = await git.getRemotes(true);
    const hasRemote = remotes.some(r => r.name === 'origin');
    
    if (!hasRemote) {
      console.log('🌐 Adding remote origin...');
      await git.addRemote('origin', REMOTE_URL);
      console.log('✅ Remote origin added.');
    } else {
      console.log('✅ Remote origin already exists.');
    }
  } catch (err) {
    console.log('🌐 Adding remote origin...');
    await git.addRemote('origin', REMOTE_URL);
    console.log('✅ Remote origin added.');
  }

  // Set local git config for commit
  await git.addConfig('user.name', 'awand795');
  await git.addConfig('user.email', 'awand795@users.noreply.github.com');

  // Add all files
  console.log('📦 Staging files...');
  await git.add('.');
  console.log('✅ Files staged.');

  // Check if there's anything to commit
  const status = await git.status();
  if (status.staged.length === 0 && status.files.length === 0) {
    console.log('ℹ️  No changes to commit.');
  } else {
    // Commit
    console.log('💾 Committing...');
    await git.commit('Initial commit - Bikin Cafe (Laravel + React)');
    console.log('✅ Commit created.');
  }

  // Push to remote
  console.log('🚀 Pushing to GitHub...');
  try {
    await git.push('origin', 'master', { '--force': null });
    console.log('✅ Push successful!');
  } catch (err) {
    try {
      await git.push('origin', 'main', { '--force': null });
      console.log('✅ Push successful!');
    } catch (err2) {
      console.error('❌ Push failed:', err2.message);
    }
  }

  console.log('\n🎉 Done! Project pushed to https://github.com/awand795/web-cafe.git');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
