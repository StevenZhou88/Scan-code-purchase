<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商城中心</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display:flex;align-items:center;width:100%;height:80px;">
      <el-row style="padding:20px;">
        <el-button type="success" @click="onAddCategory">新增商品</el-button>
      </el-row>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属分类">
          <el-select v-model="formInline.region" placeholder="分类">
            <el-option :label="item.name" :value="item.id" v-for="item in category" :key="item.id"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="formInline.keyword" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="id" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row. name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缩略图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="39px" height="39px" />
          <!-- <span style="margin-left: 10px">{{ scope.row.image }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Category.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :currentPage="page.currentPage"
      @current-change="currentChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formInline: {
        keyword: '',
        region: ''
      },
      tableData: [],
      category: [],
      page: {
        total: 0,
        currentPage: 0, // 判断当前是第几页
        pageSize: 10 // 每页显示几条数据
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    currentChange(val) {
      this.axios({
        method: 'get',
        url: `http://localhost:3000/admin/product?categoryId=${this.formInline.region}&currentPage=${val}&pageSize=${this.page.pageSize}`
      }).then(res => {
        this.tableData = res.data.product.rows
      })
    },

    init() {
      this.axios({
        method: 'get',
        url: `http://localhost:3000/admin/product?pageSize=${this.page.pageSize}`
      }).then(res => {
        console.log(res)

        this.tableData = res.data.product.rows
        this.page = {
          total: res.data.pagination.total,
          currentPage: res.data.pagination.currentPage,
          pageSize: res.data.pagination.pageSize
        }
      })

      this.axios({
        method: 'get',
        url: 'http://localhost:3000/admin/category'
      }).then(res => {
        this.category = res.data.category
      })
    },
    onSubmit() {
      console.log(this.formInline.keyword)
      let keyword = this.formInline.keyword
      let categoryId = this.formInline.region

      this.axios({
        method: 'get',
        url: `http://localhost:3000/admin/product?keyword=${keyword}&categoryId=${categoryId}&pageSize=${this.page.pageSize}`
      }).then(res => {
        console.log(res)
        this.tableData = res.data.product.rows
        this.page = {
          total: res.data.pagination.total,
          currentPage: res.data.pagination.currentPage,
          pageSize: res.data.pagination.pageSize
        }
      })
    },
    onAddCategory() {
      this.$router.push({ name: 'product_new' })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({
        name: 'product_edit',
        params: { id: row.id }
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'delete',
            url: `http://localhost:3000/admin/product/${row.id}`
          }).then(res => {
            this.$message.success('删除成功')
            this.init()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>


<style>
.cell {
  text-align: center;
}
.el-breadcrumb {
  padding: 20px;
  border-bottom: 1px solid gainsboro;
}
.demo-form-inline {
  margin-top: 26px;
  margin-left: 120px;
}
.pagination {
  padding: 40px;
}
</style>
