<template>
  <div style="padding: 20px">
    <el-card style="margin-bottom: 20px;">
      <CategorySearch @getCategoryId="getCategoryId" />
    </el-card>
    <el-card v-show="spuListShow">
      <spuList  ref="spuList" @spuList="spuList" @changeIsShow="changeIsShow" v-show="isShow == 1" />
      <addAndChangeSpu :categoryId="categoryId" @spuList="spuList" @changeIsShow="changeIsShow" v-show="isShow == 2"/>
      <addSku :categoryId="categoryId" @changeIsShow="changeIsShow" v-show="isShow == 3"/>
    </el-card>
  </div>
</template>

<script>
import CategorySearch from '@/components/CategorySearch'
import spuList from './spuList'
import addAndChangeSpu from './addAndChangeSpu'
import addSku from './addSku'
export default {
  components:{
    CategorySearch,
    spuList,
    addAndChangeSpu,
    addSku
  },
  data() {
    return {
      categoryId: {},
      isShow: 1,
      spuListShow: false
    }
  },
  methods: {
    // 点击查询获得三级分类id
    getCategoryId(formInline) {
      this.categoryId = formInline
      this.spuList()
      this.spuListShow = true
    },
    // 请求数据
    spuList() {
      // 获取页码信息
      let pageInfo = this.$refs.spuList.pageInfo
      // 获取三级分类id
      pageInfo.category3Id = this.categoryId.category3Id
      this.$store.dispatch('spuList', pageInfo)
    },

    changeIsShow(showNum) {
      this.isShow = showNum
    }
  }
}
</script>

<style>

</style>