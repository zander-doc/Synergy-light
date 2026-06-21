const chokidar = require('chokidar');
const { exec } = require('child_process');

console.log('👀 Watching for file changes...');

const watcher = chokidar.watch('.', {
  ignored: /node_modules|\.git/,
  persistent: true
});

let timeout;

watcher.on('change', path => {
  console.log(`📝 File ${path} changed. Committing in 5 seconds...`);
  
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log('🔄 Auto-committing changes...');
    exec('git add . && git commit -m "Auto-commit: changes detected" && git push origin main', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`❌ Stderr: ${stderr}`);
        return;
      }
      console.log(`✅ Changes committed and pushed!\n${stdout}`);
    });
  }, 5000);
});