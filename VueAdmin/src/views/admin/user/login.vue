<template>
  <div>
    <div class="input">
      <el-input v-model="user.username" placeholder="请输入内容" style="width:200px;padding:30px;"></el-input>

      <el-input
        placeholder="请输入密码"
        v-model="user.password"
        show-password
        style="width:200px;padding-left:30px;"
      ></el-input>

      <el-button style="width:100px;margin:30px;" @click="btnLogin">登陆</el-button>
    </div>
  </div>
</template>


<script>
import { constants } from 'crypto'
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    btnLogin() {
      this.axios
        .post(`http://localhost:3000/admin/users/login`, this.user)
        .then(res => {
          console.log(res)
          if (res.data.success == true) {
            localStorage.setItem('Authorization', 'Bearer ' + res.data.token)
            console.log(localStorage.getItem('Authorization'))
            // this.$router.push({ name: 'home' })
          } else {
            this.$message.error(res.data.message)
          }
        })
    }
  }
}
</script>
<style scoped>
.input {
  display: flex;
  flex-direction: column;
}
</style>