import request from '@/utils/request';
import qs from 'qs';

export const login = ({username, password}) => {
    const data = {
        username,
        password
    }
    return request({
        url: '/account/login',
        method: 'post',
        data: qs.stringify(data)
    })
}

export const register = (data) => {
    return request({
        url: '/account/register',
        method: 'post',
        data: qs.stringify(data)
    })
}

export const islogin = () => {
    return request({
        url: '/account/islogin',
        method: 'get'
    })
}