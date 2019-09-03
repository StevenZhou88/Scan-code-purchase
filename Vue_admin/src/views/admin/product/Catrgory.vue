<template>
  <div>
    <el-breadcrumb
      separator="/"
      style="    display: block;
    height: 15px;
    border-bottom: 1px solid gainsboro;padding:20px;"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商城中心</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="padding:20px;">
      <el-button type="success" @click="onAddCategory">新增分类</el-button>
    </el-row>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="30%">
      <!-- :before-close="handleClose" -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitNew">立即创建</el-button>
      </span>
    </el-dialog>

    <el-table :data="category" style="width: 100%">
      <el-table-column label="id" width="240">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="240">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="240">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="编辑分类" :visible.sync="dialogVisibleTwo" width="30%">
            <!-- :before-close="handleClose" -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="form.sort"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleTwo = false">取 消</el-button>
              <el-button type="primary" @click="onSubmitEdit(scope.row)">立即更新</el-button>
            </span>
          </el-dialog>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { all } from 'q'
import { constants } from 'crypto'
export default {
  data() {
    return {
      id: '',
      category: [],
      dialogVisible: false,
      dialogVisibleTwo: false,
      form: { name: '', sort: '' }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 删除的按钮 方法
    open(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .delete(`http://localhost:3000/admin/category/${row.id}`)
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.init()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    //获取分类数据
    init() {
      this.axios.get('http://localhost:3000/admin/category').then(res => {
        console.log(res)
        this.category = res.data.category
      })
    },

    // 新增的确认按钮
    onSubmitNew(type) {
      let name = this.form.name
      let sort = this.form.sort
      this.axios.post('http://localhost:3000/admin/category').then(res => {})
      this.axios({
        method: 'post',
        url: 'http://localhost:3000/admin/category',
        data: { name, sort }
      }).then(res => {
        console.log(res)
        if (res.data.message) {
          this.$message.error('排序只能为数字哦～')
        } else if (res.data.category) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.init()
        }
      })
    },

    // 编辑的确认按钮
    onSubmitEdit() {
      let name = this.form.name
      let sort = this.form.sort
      this.axios({
        method: 'put',
        url: `http://localhost:3000/admin/category/${this.id}`,
        data: { name, sort }
      }).then(res => {
        console.log(res)
        if (res.data.message) {
          this.$message.error('排序只能为数字哦～小可爱')
        } else if (res.data.category) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.dialogVisibleTwo = false
          this.init()
        }
      })
    },

    // 新增分类的按钮
    onAddCategory() {
      this.form = { name: '', sort: '' }
      this.dialogVisible = true
    },

    // 点击编辑按钮 获取当前点击id的数据传到data层
    handleEdit(index, row) {
      this.id = row.id
      // console.log(index, row)
      this.dialogVisibleTwo = true

      this.axios({
        method: 'put',
        url: `http://localhost:3000/admin/category/${row.id}`
      }).then(res => {
        this.form.name = res.data.category.name
        this.form.sort = res.data.category.sort
      })
    }
  }
}
</script>

<style>
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
.el-button--mini {
  margin-right: 8px;
}
.el-button--success {
  margin-left: 25px;
}
</style>
