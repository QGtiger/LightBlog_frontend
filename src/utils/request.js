import axios from 'axios'
import {Message, Loading} from 'element-ui';
import router from '@/router';

const service = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 5000
})

let loading; //定义loading变量

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}

// 请求拦截  设置统一header
service.interceptors.request.use(
  config => {
    // 加载
    startLoading()
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
  
// 响应拦截  401 token过期处理
service.interceptors.response.use(
  response => {
    endLoading()
    if(response.data.status == 401){
      Message.error(response.data.tips)
      // 清除token
      localStorage.removeItem('token')
      router.push('/login')
    }
    if(response.data.status == 402){
      Message.error(response.data.tips)
      router.push('/login')
    }
    return response
  },
  error => {
    // 错误提醒
    endLoading()
    console.log(error)
    Message.error(error.response.data)

    const { status } = error.response
    if (status === 401) {
      Message.error('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('token')

      // 页面跳转
      this.$router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default service
