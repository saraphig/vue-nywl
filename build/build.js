require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const fs = require('fs');
const fsExtra = require('fs-extra');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const pckVersion = require('../package.json').version;
let config = require('../config');
let webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: Waiting for recombinating the files...\n'+
      '  Ready...\n'
    ));
    // copy version.json to dist
    CopyVerToDist();
    // check project name
    var prjectName = config.build.env.PROJECT_NAME;
    // recombination start
    if(!prjectName){
      Recombination();
    }else{
      ResetSingleProject(prjectName);
    }
  })
});

function ResetSingleProject(prjectName) {
  // get all files in dist
  let distPath = path.resolve(__dirname, '../dist')
  let htmlPath = fs.readdirSync(distPath);
  let resourcePath = distPath + '/static/resource';
  // 根据filename相应操作
  for(let _html of htmlPath){
    if(/\.html$/.test(_html)){
      let fileName = _html.replace(/\.html$/,'');
      // 是指定的项目重命名，不是就剔除
      if(fileName == prjectName){
        // rename files
        fs.renameSync(distPath+'/'+_html, distPath+'/index.html');
        console.log(chalk.yellow('  rename '+_html+' success!!!'));

        // 进入resource删除不是project的文件夹
        let resourceFile = fs.readdirSync(resourcePath);
        for (let _file of resourceFile) {
          if(_file == prjectName)continue;
          fsExtra.remove(resourcePath+'/'+_file, function (err) {
            if(err)return console.log(err);
            console.log(chalk.yellow('  delete resourceFile success!!!'));
          });
        }
      }else{
        // remove
        fsExtra.removeSync(distPath+'/'+_html);
        console.log(chalk.yellow('  delete out '+_html+' success!!!'));
      }
    }
  }
}

// recombination dist files
function Recombination() {
  // get all files in dist
  let distPath = path.resolve(__dirname, '../dist')
  let htmlPath = fs.readdirSync(distPath);
  let outStaticPath = distPath + '/static';
  // create dir
  fs.mkdirSync(distPath+'/'+pckVersion, 0755);

  // 根据filename创建文件
  for(let _html of htmlPath){
    if(/\.html$/.test(_html)){
      let fileName = _html.replace(/\.html$/,'');
      if(config.build.env.PROJECT_NAME && config.build.env.PROJECT_NAME != fileName){
        continue;
      }

      let preDirPath = distPath+'/'+pckVersion;
      let preStaticPath = preDirPath+'/static';
      // create dir
      if(!fs.existsSync(preStaticPath))fs.mkdirSync(preStaticPath, 0755);
      let dirPath = preStaticPath;

      let filePath = dirPath+'/'+fileName;
      let staticPath = filePath;
      // create dir
      if(!fs.existsSync(filePath))fs.mkdirSync(filePath, 0755);
      // create static dir
      if(!fs.existsSync(staticPath))fs.mkdirSync(staticPath, 0755);
      // move the html files
      fs.renameSync(distPath+'/'+_html, preDirPath+'/'+_html);
      // search static files
      let staticFile = fs.readdirSync(outStaticPath);
      // check if file
      for(let _static of staticFile){
        //
        if(/\.\w+$/.test(_static) && new RegExp(fileName).test(_static)){
          // move files
          fs.renameSync(outStaticPath+'/'+_static, staticPath+'/'+_static);
        }else if(!(/\.\w+$/.test(_static))){
          let from = outStaticPath+'/'+_static;
          let to = staticPath+'/'+_static;
          // search static files
          let fromFile = fs.readdirSync(from);

          if(new RegExp(fileName).test(_static)){
            to = staticPath;
            //
            for(let file of fromFile){
              if(/\.\w+$/.test(file) && new RegExp(fileName).test(from)){
                // move files
                fs.renameSync(from+'/'+file, to+'/'+file);
              }else if(new RegExp(fileName).test(file)){
                Rename(from+'/'+file, to+'/'+file);
              }
            }
          }else if(new RegExp('_static').test(_static)) {
            // create dir
            if(!fs.existsSync(to))fs.mkdirSync(to, 0755);
            //
            for(let file of fromFile){
              if(/\.\w+$/.test(file) && new RegExp(fileName).test(from)){
                // move files
                fs.renameSync(from+'/'+file, to+'/'+file);
              }else if(new RegExp(fileName).test(file)){
                Rename(from+'/'+file, to+'/'+file);
              }
            }
          }
          else if(new RegExp('fonts|img').test(_static)) {
            to = dirPath+'/'+_static;
            if(fs.existsSync(to))continue;
            // create dir
            fs.mkdirSync(to, 0755);
            //
            for(let file of fromFile){
              if(/\.\w+$/.test(file)){
                // copy files
                fs.createReadStream(from+'/'+file).pipe(fs.createWriteStream(to+'/'+file));
              }else if(new RegExp(fileName).test(file)){
                //Rename(from+'/'+file, to+'/'+file);
              }
            }
          }
        }
      }
      // end modules
      console.log(`  compile ${fileName} modules success!!!\n`);
    }
  }
  // completes all files
  console.log(chalk.yellow(`  compile all modules success!!!\n`));
  // unlink outstatic files
  console.log(`  start delete out static files...\n`);
  // start removing
  fsExtra.remove(outStaticPath, function (err) {
    if(err)return console.log(err);
    console.log(chalk.yellow('  delete out static success!!!'));
    // start removing
    let __htmlPath = fs.readdirSync(distPath);
    for(let __html of __htmlPath){
      if(!/\.html$/.test(__html)){
        continue;
      }
      // remove
      fsExtra.remove(distPath+'/'+__html, function (err) {
        if(err)return console.log(err);
        console.log(chalk.yellow('  delete out '+__html+' success!!!'));
      });
    }
  });
}

function Rename(from, to){
  // search static files
  let fromFile = fs.readdirSync(from);
  // create dir
  if(!fs.existsSync(to))fs.mkdirSync(to, 0755);
  //
  for(let file of fromFile){
    if(/\.\w+$/.test(file)){
      // move files
      fs.renameSync(from+'/'+file, to+'/'+file);
    }else{
      Rename(from+'/'+file, to+'/'+file);
    }
  }
}

function CopyVerToDist() {
  let distFile = path.resolve(__dirname, '../dist/version.json');
  let versionFile = path.resolve(__dirname, '../version.json');
  // file is exist
  if(fs.existsSync(versionFile)) {
    fs.createReadStream(versionFile).pipe(fs.createWriteStream(distFile));
    console.log(chalk.yellow('  copy version.json to dist success!!'));
  }
}
