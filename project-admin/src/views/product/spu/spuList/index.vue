<template>
  
    <div>
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" @click="addAndChangeSpu"
        >添加SPU</el-button
      >

      <!-- 表格 -->
      <el-table :data="spuList.records" :border="true">
        <el-table-column
          label="序号"
          type="index"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="spu名称"
          width="150px"
          align="center"
          prop="spuName"
        ></el-table-column>
        <el-table-column label="spu描述" prop="description"></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="{ row, $index }">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="addAndChangeSpu(row)"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-s-order"
              size="mini"
              @click="inquireSkuList(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delSpu(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="spuList.total"
        :page-size="pageInfo.limit"
        @current-change="changePage"
        style="text-align: center; margin-top: 20px"
      >
      </el-pagination>

      <el-dialog title="" :visible.sync="dialogVisible" width="80%">
        <el-table :data="skuList" :border="true">
          <el-table-column label="名称" prop="skuName" align="center"></el-table-column>
          <el-table-column label="价格" width="100px" prop="price" align="center"></el-table-column>
          <el-table-column label="重量" width="100px" prop="weight" align="center"></el-table-column>
          <el-table-column label="默认图片" width="200px" align="center">
            <template slot-scope="{row, $index}">
              <div>
                <img :src="row.skuDefaultImg" alt="" style="width: 100px;">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    
  
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageInfo: {
        page: 1,
        limit: 4,
      },
      dialogVisible: false
    };
  },
  computed: {
    ...mapState({
      spuList: (state) => state.spu.spuList,
      skuList: state => state.spu.skuList
    }),
  },
  methods: {
    // 改变页码
    changePage(page) {
      this.pageInfo.page = page;
      this.$emit("spuList");
    },
    // 添加sku
    addSku(row) {
      this.$bus.$emit('addSku', row)
      this.$emit('changeIsShow', 3)
    },
    // 修改spu
    addAndChangeSpu(row) {
      this.$bus.$emit('addAndChangeSpu', row.id)
      this.$emit('changeIsShow', 2)
    },
    // 查看sku
    inquireSkuList(row) {
      this.$store.dispatch('inquireSkuList', row.id)
      this.dialogVisible = true
    },
    // 删除spu
    async delSpu(row) {
      try {
        await this.$store.dispatch('delSpu', row.id)
        this.$emit("spuList");
      } catch (error) {
        
      }
    }
  },
};
</script>

<style scoped>
</style>