<template>
  <CommonTable
    :config="config"
    :label-data="labelData"
    :table-data="tableData"
    @changePage="changePage"
    @handleSizeChange="handleSizeChange"
    @handleDelete="handleDelete">
  </CommonTable>
</template>

<script>
import CommonTable from '@/components/CommonTable/index'
import { deleteUser, getUser } from '@/api/data'
export default {
  name: 'MallView',
  data () {
    return {
      labelData: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '生日',
          prop: 'birth'
        },
        {
          label: '地址',
          prop: 'addr'
        }
      ],
      tableData: [],
      config: {
        total: 30,
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
    getList (name = '') {
      // eslint-disable-next-line no-unused-expressions
      name ? (this.config.page = 1) : ''
      this.config.loading = true
      // if (name !== '') {
      //   this.config.page = 1
      // }
      getUser({ page: this.config.page, name, limit: this.config.limit }).then(res => {
        this.tableData = res.data.list.map(item => {
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
        // console.log(111, this.config.page)
        this.config.total = res.data.count
        this.config.loading = false
        // console.log(this.tableData)
      })
    },
    handleDelete (row) {
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
    },
    changePage (page) {
      this.config.page = page
      this.getList()
    }
  },
  components: { CommonTable },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
