<template>
  <div class="resetForm">
    <div class="title">
      <div class="text">Register Form</div>
    </div>
    <el-form
      :model="resetForm"
      :rules="rules[0]"
      ref="resetForm"
      label-width="70px"
      label-position="left"
    >
      <el-form-item label="用户名" prop="username">
        <el-input prefix-icon="el-icon-user-solid" v-model="resetForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          prefix-icon="el-icon-bank-card"
          v-model="resetForm.code"
          auto-complete="off"
          style="width: calc(100% - 120px)"
        ></el-input>
        <el-button style="width: 120px" @click="handleSendCode" :disabled="isClickSendCode">
          <span v-if="!isClickSendCode" style="color: #999;background-color:inherit">获取验证码</span>
          <span v-else style="font-size: 12px">{{ leftTime }}s 后再次获取</span>
        </el-button>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input
          prefix-icon="el-icon-notebook-2"
          type="password"
          v-model="resetForm.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_password">
        <el-input
          prefix-icon="el-icon-notebook-2"
          type="password"
          v-model="resetForm.re_password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm" style="width: 100%">重置密码</el-button>
    </el-form>
    <div class="meta-footer">
      <router-link to="/login" class="left">立即登录</router-link>
      <router-link to="/register" class="right">立即注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      let checkValue = value.replace(/(^\s*)|(\s*$)/g, '')
      if (checkValue.length === 0) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z_]{1,}$/
      if (value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else if (!reg.test(value)) {
        callback(new Error('密码只能包含数字，英文字母和下划线'))
      } else if (value.length > 12) {
        callback(new Error('密码不能多于十二个'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      let checkValue = value.replace(/(^\s*)|(\s*$)/g, '')
      if (checkValue === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        username: '',
        code: '',
        password: '',
        re_password: ''
      },
      rules: [
        {
          username: [{ validator: checkUserName, trigger: 'blur' }]
        },
        {
          username: [{ validator: checkUserName, trigger: 'blur' }],
          code: [{ validator: validateCode, trigger: 'blur' }],
          password: [{ validator: validatePass, trigger: 'blur' }],
          re_password: [{ validator: validatePass2, trigger: 'blur' }]
        }
      ],
      leftTime: 60,
      isClickSendCode: false
    }
  },
  methods: {
    handleSendCode() {
      this.isClickSendCode = true
      this.leftTime = 60
      let _this = this
      let interval = setInterval(function() {
        if (_this.leftTime === 0) {
          _this.isClickSendCode = false
          clearInterval(interval)
        } else {
          _this.leftTime -= 1
        }
      }, 1000)

      this.$axios.post('/account/setpassword', this.resetForm).then(res => {
        console.log(res)
      })
    },
    submitForm() {
      this.$refs['resetForm'].validate(valid => {
        if (valid) {
          this.$axios.post('/account/setpassword', this.resetForm).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.tips)
            }
          })
        } else {
          this.$message.warning('请正确填写信息。')
        }
      })
    }
  }
}
</script>

<style scope>
@font-face {
  font-family: MainFont;
  src: url('../../assets/font/GoodVibrationsROB Script.ttf');
}

.resetForm {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 auto;
}

.resetForm .title .text {
  font-family: MainFont;
  text-align: center;
  padding-bottom: 20px;
}

.resetForm .meta-footer {
  padding-top: 10px;
  font-size: 12px;
}

.resetForm .meta-footer .left {
  float: left;
  text-decoration: none;
  color: #409eff;
}

.resetForm .meta-footer .right {
  float: right;
  text-decoration: none;
  color: #409eff;
}
</style>
