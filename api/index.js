import request from '@/utils/request.js'

// 登录
export async function login(){
    return await request('/login')
}




