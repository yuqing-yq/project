import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permission from '@/api/mockServeData/permission'
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/user/edit', userApi.updateUser)
Mock.mock('/user/add', userApi.createUser)
Mock.mock('/user/get', userApi.getUserList)
Mock.mock('/user/delete', userApi.deleteUser)
Mock.mock('/permission/getMenu', permission.getMenu)
