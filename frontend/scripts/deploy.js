const fs = require('fs');
const fsExtra = require('fs-extra');
const conf = JSON.parse(fs.readFileSync('.env', 'utf8'));

const publicPath = `${conf.deploy_relative_path}${conf.public_path}`;
const staticFiles = `${conf.deploy_relative_path}${conf.static_files}`;
const viewPath = `${conf.deploy_relative_path}${conf.views_path}`;

fsExtra.removeSync(staticFiles);

fsExtra.copySync('./build', publicPath, {
    overwrite: true
});

fsExtra.copySync('./build/index.html', viewPath, {
    overwrite: true
});
