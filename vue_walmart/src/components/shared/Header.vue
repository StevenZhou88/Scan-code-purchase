<template>
  <el-menu
    index="0"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="menu_icon">
      <i class="el-icon-loading"></i> Walsmart
    </div>
    <el-submenu index="1">
      <template slot="title">{{username==false?'未登陆':username}}</template>
      <el-menu-item index="1" v-if="username==false">登陆</el-menu-item>
      <el-menu-item index="2" v-if="username==false">注册</el-menu-item>
      <el-menu-item index="1" v-if="username">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>




<script>
export default {
  data() {
    return {
      username: ''
    }
  }
}
</script>



<style scoped>
.el-menu--horizontal > .el-submenu {
  float: right;
}

.menu_icon {
  float: left;
  width: 200px;
  color: #d3dce6;
  text-align: center;
  font-size: 30px;
}
</style>