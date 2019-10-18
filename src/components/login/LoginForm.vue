<!-- 登录页面的登录表单组件 -->
<template>
   <div class='loginForm'>
       <div class="title">
           <p class="text">Login Form</p>
       </div>
       <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="60px" label-position="left">
           <el-form-item label="用户名" prop="username">
               <el-input prefix-icon="el-icon-user-solid"  v-model="loginForm.username" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
               <el-input prefix-icon="el-icon-notebook-2" type="password" v-model="loginForm.password" auto-complete="off"></el-input>
           </el-form-item>
               <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">登录</el-button>
       </el-form>
        <div class="meta-footer">
            <router-link to="/register" class="left">立即注册</router-link>
            <div class="right">修改密码</div>
        </div>
   </div>
</template>

<script>
import {login} from '@/api/user'
export default {
    components: {},
    data() {
        var checkUserName = (rule, value, callback) => {
            if(!value){
                return callback(new Error('用户名不能为空'));
            }
            setTimeout(()=>{
                let RegCH = /^[\u4e00-\u9fa50-9a-zA-Z_]{1,}$/
                if(!RegCH.test(value)){
                    callback(new Error('用户名，只能包括中文、英文、数字和下划线'));
                }else if(value.length>12){
                    callback(new Error('用户名长度最多12个字符'));
                }
                else if(value.length < 2){
                    callback(new Error('用户名长度最少2个字符'));
                }
                else{
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            let reg = /^[0-9a-zA-Z_]{1,}$/;
            if(value.length<6){
                callback(new Error('密码不能少于六位'));
            }else if(!reg.test(value)){
                callback(new Error('密码只能包含数字，英文字母和下划线'));
            }else if(value.length > 12){
                callback(new Error('密码不能多于十二个'))
            }else{
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {validator: checkUserName, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePass, trigger: 'blur'}
                ]
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        submitForm() {
            this.$refs['loginForm'].validate((valid) => {
                console.log(valid)
                if(valid) {
                    login(this.loginForm).then(res=>{
                        let data = res.data;
                        if(res){
                            if(data.status === 1){
                                const h = this.$createElement;
                                this.$notify({
                                title: '欢迎来到LightBlog',
                                message: h('i', { style: 'color: teal'}, 'LightBlog是基于Django后端处理，和Vue的前端展示的博客网站，Just for fun.')
                                });
                                localStorage.setItem('token', data.token)
                                this.$router.push('/')
                            }else{
                                this.$message.error(data.tips);
                            }
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }else{
                    this.$message.warning('请正确填写信息。');
                }
            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='less'>
//@import url(); 引入公共css类

@font-face{
  font-family: MainFont;
  src: url('../../assets/font/GoodVibrationsROB Script.ttf');
}

.loginForm{
    width: 400px;
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 auto;
}

.el-input__inner{
    background-color: rgba(255,255,255,0.7) !important;
}

.loginForm .title .text{
    font-family: MainFont;
    text-align: center;
    padding-bottom: 20px;
}

.loginForm .meta-footer{
    padding-top: 10px;
    font-size: 12px;
}

.loginForm .meta-footer .left{
    float: left;
    text-decoration: none;
    color: #409EFF;
}

.loginForm .meta-footer .right{
    float: right;
    text-decoration: none;
    color: #409EFF;
}
</style>