<template>
  <el-form :model="form" status-icon  :rules="rules" ref="form" label-width="100px" class="login_container">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username" label-width="80px">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" label-width="80px">
      <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" label-width="80px">
      <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="submitForm(form)" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenu } from '@/api/data'

export default {
  name: 'LoginView',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '用户名长度不能小于3', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu({ username: this.form.username, password: this.form.pass }).then(res => {
            if (res.data.code === 20000) {
              this.$store.commit('clearMenu')
              this.$store.commit('setMenu', res.data.data.menu)
              // this.$store.commit('clearToken')
              const token = res.data.data.token
              this.$store.commit('setToken', token)
              this.$store.commit('addMenu', this.$router)
              this.$router.push({ name: 'home' })
              this.$message({
                type: 'success',
                message: '登陆成功'
              })
            } else {
              this.$message.error('用户名或密码错误')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit{
  margin: 10px auto 0 auto;
}
</style>
