var express = require('express')
var router = express.Router()

var qiniu = require('qiniu')
// 分类列表
router.get('/', function(req, res, next) {
  var accessKey = 'JhP4hc2XCd8gIYBBa3yM4JdKkIocgaVWG1ehoJty'
  var secretKey = '1KFqwd3OAkxG2S9zuqgZziGyOPUVfMhkdVWq-Kgx'
  var options = {
    scope: 'zhouhao'
  }
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  res.json({ uploadToken: uploadToken })
})

module.exports = router
