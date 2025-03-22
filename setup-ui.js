// This script helps ensure all necessary UI components are set up properly
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking for required UI components...');

// Make sure the ui directory exists
const uiDir = path.join(__dirname, 'components/ui');
if (!fs.existsSync(uiDir)) {
  console.log('📁 Creating UI components directory...');
  fs.mkdirSync(uiDir, { recursive: true });
}

// Check for specific UI components
const requiredComponents = [
  'button.tsx',
  'card.tsx',
  'input.tsx',
  'label.tsx',
  'tabs.tsx',
  'checkbox.tsx'
];

let missingComponents = false;

requiredComponents.forEach(component => {
  const componentPath = path.join(uiDir, component);
  if (!fs.existsSync(componentPath)) {
    console.log(`⚠️ Missing component: ${component}`);
    missingComponents = true;
  }
});

if (missingComponents) {
  console.log('⚙️ Installing required development dependencies...');
  try {
    execSync('npm install --save-dev autoprefixer postcss tailwindcss', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
  }
}

// Check for context directory
const contextsDir = path.join(__dirname, 'contexts');
if (!fs.existsSync(contextsDir)) {
  console.log('📁 Creating contexts directory...');
  fs.mkdirSync(contextsDir, { recursive: true });
}

// Check for AuthContext
const authContextPath = path.join(contextsDir, 'AuthContext.tsx');
if (!fs.existsSync(authContextPath)) {
  console.log('⚠️ Missing AuthContext.tsx');
}

console.log('✅ Setup script completed'); 