var express = require('express')
var router = express.Router()
var models = require('../../models')

// 分类列表
router.get('/', function(req, res, next) {
  // res.json(req.decoded.user.id)
  // return
  models.Category.findAll({ order: [['sort']] }).then(category => {
    res.json({ category: category })
  })
})

//文章详情
router.get('/:id', function(req, res, next) {
  let id = req.params.id
  models.Category.findByPk(id).then(category => {
    res.json({ category: category })
  })
})

// 新增分类
router.post('/', function(req, res, next) {
  // 判断是否为空
  req.body.sort == '' ? res.json({ message: '不能为空哦～' }) : req.body.sort

  // 正则判断是否为数字
  var re = /^[0-9]+.?[0-9]*$/
  !re.test(req.body.sort)
    ? res.json({ message: '只能为数字哦' })
    : !re.test(req.body.sort)

  models.Category.create(req.body).then(category => {
    res.json({ category: category })
  })
})

// 删除分类
router.delete('/:id', function(req, res, next) {
  models.Category.findByPk(req.params.id).then(category => {
    category.destroy()
    res.json({ category: category })
  })
})

// 编辑分类
router.put('/:id', function(req, res, next) {
  models.Category.findByPk(req.params.id).then(category => {
    category.update(req.body)
    res.json({ category: category })
  })
})

module.exports = router
