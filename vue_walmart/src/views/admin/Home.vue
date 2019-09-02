<template>
  <div>
    <el-alert
      class="home_desc"
      title="Walsmart后台管理系统"
      type="success"
      :closable="false"
      description="这是一个基于Node.js + ElementUI使用接口开发模式开发的一套后台管理系统。主要业务用于扫码购物的各个模块，如：商品管理、分类管理、用户管理等。
          本次系统还在不断完善中，敬请期待....
        "
      show-icon
    ></el-alert>

    <el-alert
      title="辅助工具和资料"
      type="warning"
      description="1、phpstrom编辑器 2、mamp集成开发环境 3、api接口测试软件postman"
      :closable="false"
      show-icon
    ></el-alert>

    <div class="hengxian"></div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.el-main {
  padding: 0;
  margin: 0;
}
.el-alert__title.is-bold {
  font-weight: 900;
}

.el-alert__title {
  font-size: 25px;
  line-height: 30px;
}

.el-alert .el-alert__description {
  font-size: 14px;
  margin: 10px 0 0;
}

.el-alert--warning {
  margin-top: 10px;
}
.some_total {
  margin-top: 50px;
}
.hengxian {
  margin-top: 20px;
  border-top: 1px solid #eeeeee;
}
.animate_fix > div {
  padding: 0;
}
</style>

