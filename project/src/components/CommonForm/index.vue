<template>
  <el-form ref="form" label-width="100px" :inline="inline" :model="formData">
    <el-form-item v-for="item in formLabel" :label="item.label" :key="item.label">
      <el-input
        v-if="item.type=== 'input'"
        :placeholder="'请输入'+item.label"
        v-model="formData[item.model]">
      </el-input>
      <el-switch
       v-if="item.type === 'switch'"
       v-model="formData[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type==='date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
        v-model="formData[item.model]"
      >
      </el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="formData[item.model]"
      >
        <el-option
         v-for="item in item.opts"
         :key="item.value"
         :label="item.label"
         :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommonForm',
  data () {
    return {
      formData: this.form
    }
  },
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean
  },
  watch: {
    formData: {
      handler: function () {
        this.formData = this.form
      },
      deep: true
    }
  }

}
</script>

<style scoped>

</style>
