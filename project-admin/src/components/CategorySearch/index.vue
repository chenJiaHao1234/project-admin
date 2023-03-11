<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="formInline.category1Id"
          placeholder="一级分类"
          @focus="category1List"
          @change="category1IdChange"
        >
          <el-option
            :label="category1.name"
            :value="category1.id"
            v-for="category1 in returnCategory1List"
            :key="category1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="formInline.category2Id"
          placeholder="二级分类"
          @focus="category2List"
          @change="category2IdChange"
        >
          <el-option
            :label="category2.name"
            :value="category2.id"
            v-for="category2 in returnCategory2List"
            :key="category2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="formInline.category3Id"
          placeholder="三级分类"
          @focus="category3List"
        >
          <el-option
            :label="category3.name"
            :value="category3.id"
            v-for="category3 in returnCategory3List"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="categorySearch" :disabled="formInline.category3Id == ''">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$bus.$on('updateAttrInfoList', () => {
      this.categorySearch()
    })
  },
  computed: {
    ...mapState({
      returnCategory1List: (state) => state.attr.returnCategory1List,
      returnCategory2List: (state) => state.attr.returnCategory2List,
      returnCategory3List: (state) => state.attr.returnCategory3List,
    }),
  },
  data() {
    return {
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    // 获取一级分类列表
    category1List() {
      this.$store.dispatch("category1List");
    },
    // 获取二级分类列表
    category2List() {
      if (this.formInline.category1Id !== "") {
        this.$store.dispatch("category2List", this.formInline.category1Id);
      }
    },
    // 获取三级分类列表
    category3List() {
      if (this.formInline.category2Id !== "") {
        this.$store.dispatch("category3List", this.formInline.category2Id);
      }
    },
    // 一级路由发生改变
    category1IdChange() {
      this.formInline.category2Id = "";
      this.formInline.category3Id = "";
      this.$store.commit("CLEARRETURNCATEGORY2LIST");
      this.$store.commit("CLEARRETURNCATEGORY3LIST");
    },
    // 二级路由发生改变
    category2IdChange() {
      this.formInline.category3Id = "";
      this.$store.commit("CLEARRETURNCATEGORY3LIST");
    },
    // 点击查询按钮传出分类Id
    categorySearch() {
      this.$emit('getCategoryId', this.formInline)
    },
  },
};
</script>

<style scoped>
</style>