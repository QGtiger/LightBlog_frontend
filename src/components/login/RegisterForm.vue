<template>
    <div class="registerForm">
        <div class="title">
            <div class="text">Register Form</div>
        </div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="70px" label-position="left">
            <el-form-item label="用户名" prop="username">
                <el-input prefix-icon="el-icon-user-solid" v-model="registerForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" prop="email_input">
                <el-input prefix-icon="el-icon-bank-card" v-model="registerForm.email_input" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input prefix-icon="el-icon-notebook-2" type="password" v-model="registerForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="new_password">
                <el-input prefix-icon="el-icon-notebook-2" type="password" v-model="registerForm.new_password" auto-complete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm(registerForm)" style="width: 100%">注册</el-button>
        </el-form>
        <div class="meta-footer">
            <router-link to="/login" class="left">立即登录</router-link>
            <div class="right">修改密码</div>
        </div>
    </div>
</template>

<script>
import {register} from '@/api/user'
export default {
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
        var validatePass2 = (rule, value, callback) => {
            if(value === ''){
                calback(new Error('请再次输入密码'));
            }else if(value !== this.registerForm.password){
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        }
        var validateEmail = (rule, value, callback) => {
            let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(value === ''){
                callback(new Error('请输入邮箱'));
            }else if(!regEmail.test(value)){
                callback(new Error('请正确输入邮箱'))
            }else{
                callback();
            }
        }
        return {
            registerForm: {
                username: '',
                email_input: '',
                password: '',
                new_password: ''
            },
            rules: {
                username:[
                    {validator: checkUserName, trigger: 'blur'}
                ],
                email_input: [
                    {validator: validateEmail, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                new_password: [
                    {validator: validatePass2, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(data) {
            this.$refs['registerForm'].validate((valid) => {
                if(valid) {
                    register(data).then(res=>{
                        console.log(res.data);
                        if(res.data.status === 5){
                            this.$message.success(res.data.tips);
                            localStorage.setItem('token', res.data.token);
                            this.$router.push('/');
                        }else{
                            this.$message.error(res.data.tips);
                        }
                    })
                }else{
                    this.$message.warning('请正确填写信息。');
                }
            })
        }
    }
}
</script>

<style scope>
@font-face{
  font-family: MainFont;
  src: url('../../assets/font/GoodVibrationsROB Script.ttf');
}

.registerForm{
    width: 400px;
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 auto;
}

.registerForm .title .text{
    font-family: MainFont;
    text-align: center;
    padding-bottom: 20px;
}

.registerForm .meta-footer{
    padding-top: 10px;
    font-size: 12px;
}

.registerForm .meta-footer .left{
    float: left;
    text-decoration: none;
    color: #409EFF;
}

.registerForm .meta-footer .right{
    float: right;
    text-decoration: none;
    color: #409EFF;
}
</style>