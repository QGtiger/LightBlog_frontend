import request from '@/utils/request';
import qs from 'qs';

export const getBlogs = (currentPage) => {
    return request({
        url: '/article/article_page?page=' + currentPage,
        method: 'get',
    })
}