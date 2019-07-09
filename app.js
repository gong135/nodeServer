'use strict';

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
