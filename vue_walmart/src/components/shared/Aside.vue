<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">
      <span slot="title">
        <i class="el-icon-s-home"></i>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
      </span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-shopping-cart-full"></i>
        <span>商城中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/product">
          <i class="el-icon-s-goods"></i>商品管理
        </el-menu-item>
        <el-menu-item index="/catrgory">
          <i class="el-icon-date"></i>商品分类
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>