import axios from '@/api/axios'

export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param
  })
}
export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}
export const editUser = (param) => {
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data: param
  })
}
export const addUser = (param) => {
  return axios.request({
    url: '/user/add',
    method: 'post',
    data: param
  })
}
export const getUser = (param) => {
  return axios.request({
    url: '/user/get',
    method: 'get',
    data: param
  })
}
export const deleteUser = (param) => {
  return axios.request({
    url: '/user/delete',
    method: 'get',
    data: param
  })
}
