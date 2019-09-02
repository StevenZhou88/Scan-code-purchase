var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var cors = require('cors') //跨域
var jwt = require('jsonwebtoken') //后台登录接口认证
require('dotenv').config()

//小程序接口路由
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var cartsRouter = require('./routes/carts')

//后台接口路由
var adminCategoriesRouter = require('./routes/admin/category')
var adminProductsRouter = require('./routes/admin/product')
var adminPhotosRouter = require('./routes/admin/photo')
var adminUsersRouter = require('./routes/admin/users')

// 订单接口路由
var ordersRouter = require('./routes/orders')

var app = express()

//跨域
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  //不需要验证的URL
  var allowUrl = ['/admin/users/login', '/admin/users/register', '/users/login']
  if (allowUrl.indexOf(req.url) != '-1') return next()

  var token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  }

  //token可能存在post请求和get请求
  if (!token) {
    return res.status(401).send({
      success: false,
      message: '当前接口需要认证才能访问.'
    })
  }

  //验证token是否正确
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: 'token过期，请重新登录'
      })
    }

    //验证是否是后台管理员
    var reg = /\/admin/
    if (reg.test(req.url) && !decoded.user.admin) {
      return res.status(401).send({
        success: false,
        message: '当前接口是管理员接口'
      })
    }

    //解析出来的数据存入req
    req.decoded = decoded
    next()
  })
})

//注册小程序接口路由
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/carts', cartsRouter)

// 注册订单接口路由
app.use('/orders', ordersRouter)

//注册后台接口路由
app.use('/admin/category', adminCategoriesRouter)
app.use('/admin/product', adminProductsRouter)
app.use('/admin/photo', adminPhotosRouter)
app.use('/admin/users', adminUsersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
