<template>
  <div>
    <el-form
      :model="product"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="product.categoryId" placeholder="请选择活动区域">
          <el-option :label="item.name" :value="item.id" v-for="item in category" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="product.name"></el-input>
      </el-form-item>

      <el-form-item label="缩略图" prop="image">
        <el-upload
          :data="qiniuForm"
          class="avatar-uploader"
          action="https://upload-z2.qiniup.com"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="product.image" :src="product.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="单价" prop="price">
        <el-input v-model="product.price"></el-input>
      </el-form-item>

      <el-form-item label="库存" prop="stock">
        <el-input v-model="product.stock"></el-input>
      </el-form-item>

      <el-form-item label="商品描述" prop="body">
        <el-input type="textarea" v-model="product.body"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const uuidV1 = require('uuid/v1')
export default {
  data() {
    return {
      qiniuForm: {
        key: '', //文件名称
        token: ''
      },
      category: [],
      product: {
        name: '',
        image: '',
        body: '',
        price: '',
        stock: '',
        categoryId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' }
        ]
        // price: [{ type: init, message: '必须为数字' }]
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/admin/category'
      }).then(res => {
        this.category = res.data.category
      })
    },
    submitForm(formName) {
      let data = this.product
      this.$refs[formName].validate(valid => {
        this.axios({
          method: 'post',
          url: `http://localhost:3000/admin/product`,
          data: this.product
        }).then(res => {
          this.$router.push({ name: 'product' })
          this.$message.success('新增商品成功')
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 上传之前
    async beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      //如果验证失败，返回假
      if (isJPG && isLt2M == false) return false

      let fileType = file.type == 'image/jpeg' ? 'jpg' : 'png' //获取扩展名

      // 请求token
      let res = await this.axios.get('http://localhost:3000/admin/photo')
      this.qiniuForm = {
        key: `${uuidV1()}.${fileType}`, //文件名称
        token: res.data.uploadToken
      }
    },

    // 上传成功
    uploadSuccess(res, file) {
      console.log(res)
      this.product.image = 'http://pvygfxnx5.bkt.clouddn.com/' + res.key
    }
  }
}
</script>

<style>
.demo-ruleForm {
  padding: 20px 500px 20px 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
