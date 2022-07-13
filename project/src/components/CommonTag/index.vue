<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark': 'plain' "
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonTag',
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      close: 'DEL_TABSLIST'
    }),
    changeMenu (item) {
      this.$store.dispatch('selectMenu', item)
      this.$router.push({ name: item.name })
    },
    handleClose (tag, index) {
      const length = this.tags.length - 1
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return null
      } else {
        if (index === length) {
          this.$router.push({
            name: this.tags[index - 1].name
          })
          this.$store.commit('SET_CURRENTMENU', this.tags[index - 1].name)
        } else {
          this.$router.push({
            name: this.tags[index].name
          })
          this.$store.commit('SET_CURRENTMENU', this.tags[index].name)
        }
      }
      // this.$store.commit('delTabsList', tag)
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  }
}
</script>

<style scoped lang="less">
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
