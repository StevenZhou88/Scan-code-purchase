var express = require('express')
var router = express.Router()
var models = require('../models')

// 查询当前用户的购物车信息
router.get('/', function(req, res, next) {
  // 查找Cart模型的全部商品信息
  models.Cart.findAll({
    // 关联Product模型
    include: [models.Product],
    // 条件语句 查找全部userID为req.decoded.user.id的商品
    where: { userId: req.decoded.user.id }
  }).then(cart => {
    // 总计 和 总数的计算
    let total_price = 0
    let number = 0
    cart.map(item => {
      total_price += item.number * item.Product.price
      number += item.number
    })

    res.json({
      success: true,
      message: '查询成功',
      data: cart,
      total: total_price,
      number: number
    })
  })
})

// 点击加入购物车
router.post('/', function(req, res, next) {
  // 获取传过来的code
  var code = req.body.code
  models.Product.findOne({
    // 条件语句 去Product模型里面去搜索code为传过来的code的数据
    where: {
      code: code
    }
  }).then(product => {
    // 如果没有则返回false
    if (!product) {
      res.json({ success: false, message: '此商品不存在！' })
      return
    }
    models.Cart.findOrCreate({
      where: {
        productId: product.id,
        userId: req.decoded.user.id
      },
      defaults: {
        number: 1,
        userId: req.decoded.user.id,
        productId: product.id
      }
    }).spread((cart, created) => {
      console.log(created)
      if (!created) {
        //如果创建失败，则说明carts表里面已经有了该商品，只需增加它的数量
        models.Cart.findOne({ where: { productId: product.id } })
          .then(cart => {
            return cart.increment('number')
          })
          .then(cart => {
            res.json({ success: true, message: '修改成功' })
          })
      }
      res.json({ success: true, message: '添加到购物车', data: cart })
    })
  })
})

// 购物车数量加减
router.put('/', function(req, res, next) {
  let type = req.body.type
  let cart_id = req.body.cart_id

  models.Cart.findByPk(cart_id).then(cart => {
    if (type === 'inc') {
      cart.increment('number')
      return res.json({ success: true, message: '修改成功' })
    }

    if (cart.number > 1) {
      cart.decrement('number')
      return res.json({ success: true, message: '修改成功' })
    }

    cart.destroy()
    res.json({ success: true, message: '删除成功' })
  })
})

// 清空购物车
router.delete('/', function(req, res, next) {
  models.Cart.destroy({
    include: [models.User],
    where: { userId: req.decoded.user.id }
  }).then(() => {
    res.json({ success: true, message: '清空成功' })
  })
})

module.exports = router
