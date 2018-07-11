var nongyeHost = process.env.NONGYE_HOST ? process.env.NONGYE_HOST : '/nongye.html';
var assetsHost = process.env.ASSETS_HOST ? process.env.ASSETS_HOST : '/';

// project-name
var projectName = process.env.PROJECT_NAME ? process.env.PROJECT_NAME : '';

module.exports = {
  NODE_ENV: '"production"',
  NONGYE_HOST: `"${nongyeHost}"`,
  ASSETS_HOST: `"${assetsHost}"`,
  PROJECT_NAME: `${projectName}`,
}
