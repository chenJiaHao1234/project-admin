<template>
  <div style="padding: 20px">
    <el-table :data="skuList.records" :border="true">
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        align="center"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        align="center"
      ></el-table-column>
      <el-table-column label="默认图片" width="100px" align="center">
        <template slot-scope="{ row, $index }">
          <div>
            <img :src="row.skuDefaultImg" alt="" style="width: 50px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="重量(kg)"
        prop="weight"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="100px"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <div>
            <el-button
              type="success"
              icon="el-icon-top"
              size="mini"
              @click="onSale(row)"
              v-if="row.isSale == 0"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-bottom"
              size="mini"
              @click="cancelSale(row)"
              v-else
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-s-order"
              size="mini"
              @click="inquireDetail(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delSku(row)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      :total="skuList.total"
      :current-page="pageInfo.page"
      :page-size="pageInfo.limit"
      layout="prev, pager, next"
      @current-change="changePage"
      style="text-align: center; margin-top: 20px"
    >
    </el-pagination>
    <!-- 查看按钮 -->
    <el-dialog :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="4"><div class="title">名称</div></el-col>
        <el-col :span="20"><div class="center">{{ skuDetailInfo.skuName }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="title">描述</div></el-col>
        <el-col :span="20"><div class="center">{{ skuDetailInfo.skuDesc }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="title">价格</div></el-col>
        <el-col :span="20"><el-tag type="info">￥{{ skuDetailInfo.price }}</el-tag></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="title">平台属性</div></el-col>
        <el-col :span="20"><div class="center" v-for="attr in skuDetailInfo.skuAttrValueList">{{ attr.attrName }}: {{ attr.valueName }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="title">销售属性</div></el-col>
        <el-col :span="20"><div class="center" v-for="asleAttr in skuDetailInfo.skuSaleAttrValueList">{{ asleAttr.saleAttrName }}: {{ asleAttr.saleAttrValueName }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="title">商品图片</div></el-col>
        <el-col :span="20">
          <el-carousel style="width: 300px;">
            <el-carousel-item v-for="img in skuDetailInfo.skuImageList" >
            <template slot-scope="{row, $index}">
              <div>
                <img :src="img.imgUrl" alt="" style="width: 100%;height: 100%;">
              </div>
            </template></el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
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
        limit: 5,
      },
      abc: "",
      dialogVisible: false,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState({
      skuList: (state) => state.sku.skuList,
      skuDetailInfo: state => state.sku.skuDetailInfo
    }),
  },
  methods: {
    // 发请求
    getData() {
      this.$store.dispatch("skuList", this.pageInfo);
    },
    // 改变页码
    changePage(page) {
      this.pageInfo.page = page;
      this.getData();
    },
    // 上架
    async onSale(row) {
      try {
        await this.$store.dispatch("onSale", row.id);
        row.isSale = 1;
        this.$message({
          message: "上架成功",
          type: "success",
        });
      } catch (error) {}
    },
    // 下架
    async cancelSale(row) {
      try {
        await this.$store.dispatch("cancelSale", row.id);
        row.isSale = 0;
        this.$message({
          message: "下架成功",
          type: "success",
        });
      } catch (error) {}
    },
    //查看
    inquireDetail(row) {
      this.dialogVisible = true;
      this.$store.dispatch('getSkuById', row.id)
      // this.skuDetailInfo = row;
      // console.log(row);
    },
    // 删除
    async delSku(row) {
      try {
        await this.$store.dispatch('delSku', row.id)
        this.getData()
      } catch (error) {
        
      }
    }
  },
};
</script>

<style scoped>
.el-row {
  margin: 10px 0;
}
.title {
  font-weight: 700;
  font-size: 16px;
  text-align: right;
  padding-right: 10px;
  line-height: 20px;
}
.center {
  line-height: 20px;
}
</style>