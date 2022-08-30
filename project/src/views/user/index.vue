<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户':'更新用户'"
      :visible.sync="isShow"
    >
<!--      <CommonForm :form-label="operateFormLabel" :form="operateForm" :inline="true" ref="form"></CommonForm>-->
      <el-form :model="operateForm" status-icon :rules="rules" ref="operateForm" inline label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input  placeholder="请输入姓名" v-model="operateForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-cascader :options="options" v-model="selectAddr" @change="handleChange" placeholder="请选择地址"></el-cascader>
<!--          <el-input  v-model="operateForm.addr" placeholder="请输入地址" autocomplete="off"></el-input>-->
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="operateForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="operateForm.birth" ></el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="operateForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <div id="form">
        <el-form  :model="searchForm" ref="ruleForm" inline label-width="100px" class="demo-ruleForm">
          <el-form-item  prop="keyword">
            <el-input  placeholder="请输入" v-model="searchForm.keyword"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" :loading="config.loading" @click="getList(searchForm.keyword)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="common-table">
      <el-table
        :data="tableData"
        stripe
        height="500px"
        style="width: 100%">
        <el-table-column
          label="姓名"
          prop="name"
          width="180">
          <!--        <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>姓名: {{ scope.row.name }}</p>
                      <p>年龄： {{scope.row.age}}</p>
                      <p>性别： {{scope.row.sex}}</p>
                      <p>生日： {{scope.row.birth}}</p>
                      <p>住址: {{ scope.row.addr }}</p>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.name }}</span>
                      </div>
                    </el-popover>
                  </template>-->
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
        </el-table-column>
        <el-table-column
          label="生日"
          prop="birth"
          width="180">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="addr"
          width="280">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        :page-size=this.config.limit
        :page-sizes="[5,10, 15, 20, 30]"
        @current-change="changePage"
        :current-page.sync="config.page"
        class="pager"
        layout="sizes, prev, pager, next"
        :total="config.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { addUser, deleteUser, editUser, getUser } from '@/api/data'
export default {
  name: 'UserView',
  data () {
    return {
      tableData: [],
      options: regionData,
      selectAddr: [],
      operateType: 'add',
      isShow: false,
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      searchForm: {
        keyword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      },
      config: {
        total: 30,
        page: 1,
        limit: 20,
        loading: false
      }
    }
  },
  methods: {
    confirm () {
      this.$refs.operateForm.validate((valid) => {
        if (valid) {
          if (this.operateType === 'edit') {
            editUser(this.operateForm).then(res => {
              this.isShow = false
              this.getList()
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              console.log(res)
            })
          } else {
            addUser(this.operateForm).then(res => {
              this.isShow = false
              this.getList()
              console.log(res)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            })
          }
        } else {
          this.$message({
            message: '请填写完表单',
            type: 'warning'
          })
          // console.log('error submit!!')
          return false
        }
      })
    },
    addUser () {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
      this.selectAddr = []
    },
    getList (name = '') {
      // eslint-disable-next-line no-unused-expressions
      name ? (this.config.page = 1) : ''
      this.config.loading = true
      // if (name !== '') {
      //   this.config.page = 1
      // }
      // console.log(name)
      getUser({ page: this.config.page, name, limit: this.config.limit }).then(res => {
        this.tableData = res.data.list.map(item => {
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
        // console.log(111, this.config.page)
        this.config.total = res.data.count
        this.config.loading = false
      })
    },
    handleChange (value) {
      const addr = []
      value.forEach(e => {
        addr.push(CodeToText[e])
      })
      this.operateForm.addr = addr.join(' ')
      // console.log(this.operateForm.addr)
    },
    changePage (page) {
      this.config.page = page
      this.getList()
    },
    handleEdit (index, row) {
      this.isShow = true
      this.operateType = 'edit'
      this.operateForm = row
      this.selectAddr = []
      // const addrArr = row.addr.split(' ')
      // console.log(addrArr)
      // const province = addrArr[0]
      // const city = addrArr[1]
      // const district = addrArr[2]
      // // eslint-disable-next-line no-unused-expressions
      // const pro = TextToCode[province].code
      // // eslint-disable-next-line no-unused-expressions
      // const area = TextToCode[city].code
      // // eslint-disable-next-line no-unused-expressions
      // const dis = TextToCode[district].code
      // console.log(TextToCode[province].code)
      // this.selectAddr.push(pro)
      // this.selectAddr.push(area)
      // this.selectAddr.push(dis)
      // console.log(this.selectAddr)
      // this.selectAddr = [TextToCode[province].code, TextToCode[city].code, TextToCode[district].code]
      // console.log(this.selectAddr)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除此条信息?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        const id = row.id
        deleteUser(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    handleSizeChange (val) {
      this.config.limit = val
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="less">
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table{
    height: calc(100% - 62px);
    background: white;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pager{
      bottom: -40px;
      right: 20px;
    }
  }
  #form{
    margin-top: 20px;
  }
</style>
