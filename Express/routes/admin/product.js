var express = require('express')
var router = express.Router()
var models = require('../../models')
const Sequelize = require('Sequelize')
const Op = Sequelize.Op

//商品详情
router.get('/:id', function(req, res, next) {
  let id = req.params.id
  models.Product.findByPk(id).then(product => {
    res.json({ product: product })
  })
})

// 商品搜索
router.get('/', function(req, res, next) {
  var currentPage =
    req.query.currentPage == undefined ? 1 : req.query.currentPage
  // 判断当前是第几页

  var pageSize = req.query.pageSize == undefined ? 1 : req.query.pageSize
  // 每页显示几条数据

  var data = {}
  var keyword = req.query.keyword
  if (keyword != '' && keyword != undefined) {
    data.name = {
      [Op.like]: '%' + keyword + '%'
    }
  }

  // 分类搜索
  var categoryId = req.query.categoryId
  // res.json({ categoryId })
  if (categoryId != '' && categoryId != undefined) {
    data.categoryId = {
      [Op.eq]: categoryId
    }
  }

  models.Product.findAndCountAll({
    include: [models.Category],
    where: data,
    offset: (currentPage - 1) * pageSize,
    limit: parseInt(pageSize),
    order: [['id']]
  }).then(result => {
    res.json({
      product: result,
      pagination: {
        current: parseInt(currentPage),
        pageSize: parseInt(pageSize),
        total: result.count
      }
    })
  })
})

// 新增接口
router.post('/', function(req, res, next) {
  models.Product.create(req.body).then(product => {
    res.json({ product: product })
  })
})

// 删除接口
router.delete('/:id', function(req, res, next) {
  models.Product.findByPk(req.params.id).then(products => {
    products.destroy()
    res.json({ products: products })
  })
})

// 编辑接口
router.put('/:id', function(req, res, next) {
  models.Product.findByPk(req.params.id).then(products => {
    products.update(req.body)
    res.json({ products: products })
  })
})

module.exports = router
