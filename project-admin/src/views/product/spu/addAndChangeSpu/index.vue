<template>
  <div>
    <el-form :model="getSpuInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="spu名称">
        <el-input v-model="getSpuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="getSpuInfo.tmId" placeholder="品牌">
          <el-option
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            v-for="tradeMark in trademarkList"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input type="textarea" v-model="getSpuInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="newSpuImageList || []"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="baseSaleAttrIdAndName" placeholder="">
          <el-option
            :label="baseSaleAttr.name"
            :value="`${baseSaleAttr.id}:${baseSaleAttr.name}`"
            v-for="baseSaleAttr in baseSaleAttrList"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!baseSaleAttrIdAndName"
          @click="addBaseSaleAttr"
          style="margin-left: 20px"
          >添加销售属性</el-button
        >
      </el-form-item>
      <el-form-item label="销售属性列表">
        <el-table :data="getSpuInfo.spuSaleAttrList" :border="true">
          <el-table-column
            label="序号"
            type="index"
            width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="150px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,index,row)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                ref="inputFocus"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAttr($index)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSpuInfo">保存</el-button>
        <el-button @click="changeIsShow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$bus.$on("addAndChangeSpu", async (spuId) => {
      if(spuId) {
        // 请求spu基本信息
      this.$store.dispatch("getSpuInfo", spuId);
      // spu图片
      this.$store.dispatch("spuImageList", spuId);
      }else {
        this.getSpuInfo.category3Id = this.categoryId.category3Id
      }
      // 品牌
      this.$store.dispatch("getTrademarkList");
      // 销售属性
      this.$store.dispatch("baseSaleAttrList");
    });
  },
  beforeDestroy() {
    this.$bus.$off("addAndChangeSpu");
  },
  computed: {
    ...mapState({
      getSpuInfo: (state) => state.spu.getSpuInfo || [],
      trademarkList: (state) => state.spu.trademarkList || [],
      baseSaleAttrList: (state) => state.spu.baseSaleAttrList || [],
      spuImageList: (state) => state.spu.spuImageList || [],
    }),
  },
  props: ['categoryId'],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      newSpuImageList: [],
      // ------------
      baseSaleAttrIdAndName: "",
    };
  },
  methods: {
    // 上传图片回调
    handleSuccess(response, file, fileList) {
      this.newSpuImageList = fileList;
    },
    //删除图片回调
    handleRemove(file, fileList) {
      this.newSpuImageList = fileList;
    },
    // 放大查看图片回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // -------------------------------------------
    // 添加销售属性按钮
    addBaseSaleAttr() {
      console.log(this.baseSaleAttrIdAndName);
      let [baseSaleAttrId, saleAttrName] = this.baseSaleAttrIdAndName.split(":");
      this.getSpuInfo.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
    },
    // -------------------------------------------
    // 添加属性值(切换为input框然后获取焦点)
    showInput(row) {
      this.$set(row, 'inputValue', '')
      this.$set(row, 'inputVisible', true)
      this.$nextTick(() => {
        this.$refs.inputFocus.focus()
      })
    },
    // input框失去焦点(收集信息后存入属性值列表)
    handleInputConfirm(row) {
      if(row.inputValue !== '') {
        let newSpuSaleAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrName: row.saleAttrName,
        saleAttrValueName: row.inputValue
      }
      row.spuSaleAttrValueList.push(newSpuSaleAttrValue)
      }
      row.inputValue = ''
      row.inputVisible = false
    },
    // 删除属性值列表中的某一项
    handleClose(tag, index, row) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    // 删除某一条属性
    delAttr(index) {
      console.log(index);
      this.getSpuInfo.spuSaleAttrList.splice(index, 1)
    },
    // -------------------------------------------
    // 取消按钮
    changeIsShow() {
      this.$emit("changeIsShow", 1);
      this.getSpuInfo.category3Id = ''
      this.getSpuInfo.description = ''
      this.getSpuInfo.id = ''
      this.getSpuInfo.spuName = ''
      this.getSpuInfo.spuSaleAttrList = []
      this.getSpuInfo.tmId = ''
      this.newSpuImageList = []
    },
    // 保存按钮
    async saveSpuInfo() {
      this.getSpuInfo.spuImageList = this.newSpuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: item.response? item.response.data : item.imgUrl
        }
      })
      try {
        await this.$store.dispatch('updateSpuInfo', this.getSpuInfo)
        this.$emit('spuList')
        this.$emit("changeIsShow", 1);
        this.getSpuInfo.description = ''
        this.getSpuInfo.spuName = ''
        this.getSpuInfo.spuSaleAttrList = []
        this.getSpuInfo.tmId = ''
        this.newSpuImageList = []
      } catch (error) {
        
      }
    },
  },
  watch: {
    spuImageList: {
      handler() {
        this.newSpuImageList = this.spuImageList
      }
    }
  }
};
</script>

<style >
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>