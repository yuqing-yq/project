<template>
  <div>
  <el-table
    :data="tableData"
    height="400px"
    stripe
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in labelData"
      :label="item.label"
      :prop="item.prop"
      :key="index"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
      </template>
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
    :page-size="conf.limit"
    :page-sizes="[5,10, 15, 20, 30]"
    @current-change="changePage"
    :current-page.sync="conf.page"
    class="pager"
    layout="sizes, prev, pager, next"
    :total="conf.total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  data () {
    return {
      conf: {}
    }
  },
  props: {
    tableData: Array,
    labelData: Array,
    config: Object
  },
  methods: {
    initData () {
      this.conf = this.config
    },
    handleDelete (index, row) {
      this.$emit('handleDelete', row)
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  },
  watch: {
    config: {
      handler: function () {
        this.initData()
      },
      deep: true
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
