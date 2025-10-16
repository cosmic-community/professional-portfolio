const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'),
  'utf-8'
);

const scriptTag = `<script>${scriptContent}</script>`;

function injectIntoHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  if (html.includes('dashboard-console-capture')) {
    return;
  }
  
  html = html.replace('</head>', `${scriptTag}</head>`);
  fs.writeFileSync(filePath, html);
  console.log(`Injected console capture into ${filePath}`);
}

const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  const htmlFiles = fs.readdirSync(outDir)
    .filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    injectIntoHtml(path.join(outDir, file));
  });
}