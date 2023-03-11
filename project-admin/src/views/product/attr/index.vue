<template>
  <div style="padding: 20px">
    <el-card style="margin-bottom: 20px;">
      <CategorySearch @getCategoryId="getCategoryId" />
    </el-card>
    <el-card v-show="isShow">
      <attrInfoList/>
    </el-card>
  </div>
</template>

<script>
import CategorySearch from '@/components/CategorySearch'
import attrInfoList from './attrInfoList'
export default {
  components: {
    CategorySearch,
    attrInfoList
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    // 接收分类Id
    getCategoryId(formInline) {
      // 获得属性列表(且把三级分类id存入仓库)
      this.$store.dispatch("attrInfoList", formInline)
      this.isShow = true
    }
  }
};
</script>

<style scoped>
</style>