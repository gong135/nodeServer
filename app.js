'use strict';
// 加载用户模型 db
const fs = require('fs');
const  path = require('path');
const  mongoose = require('mongoose');
const db = 'mongodb://localhost/86links-db';
mongoose.Promise = require('bluebird');
mongoose.connect(db);
const modules_path = path.join(__dirname, '/app/model');

function walk(modelPath) {
    fs.readdirSync(modelPath)
    .forEach(file => {
        let filePath = path.join(modelPath, '/'+ file);
        let stat = fs.statSync(filePath);
        if(stat.isFile()) {
            if(/\(.*)\.(js|coffee)/.test(file)) {
                require(filePath);
            }
        }else if(stat.isDirectory()){
            walk(filePath)
        }
    })
}
walk(modules_path);

var koa = require('koa');
var logger = require('koa-logger');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');
var app = new koa();

// 加密用饿中间件
app.keys = ['asdfasd112312sdfasda'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

var router = require('./config/routes')();

app.use(router.routes()).use(router.allowedMethods());

app.listen(3004);
