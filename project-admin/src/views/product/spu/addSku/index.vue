<template>
  <div>
    <el-form :model="skuInfo" label-width="80px">
      <el-form-item label="sku名称" >
        <el-input v-model="skuInfo.skuName"  placeholder="请输入sku名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" >
        <el-input v-model="skuInfo.price" placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)" >
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述" >
        <el-input v-model="skuInfo.skuDesc" placeholder="规格描述" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form  :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList">
            <el-select placeholder="请选择属性" v-model="attr.attrIdOrattrValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList">
            <el-select placeholder="请选择属性" v-model="saleAttr.saleAttrIdOrsaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table :data="newSpuImageList" :border="true">
          <el-table-column  width="80px" >
            <template slot-scope="{row, $index}">
              <div>
                <el-checkbox v-model="row.checked" @change="!row.checked"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row, $index}">
              <div>
                <img :src="row.imgUrl" alt="" style="width: 50px;">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row, $index}">
              <div>
                <el-button type="success" size="mini" v-if="row.isDefault == 1">默认</el-button>
                <el-button type="primary" size="mini"  v-else @click="changeDefault(row)">设为默认</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="changeIsShow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['categoryId'],
  mounted() {
    this.$bus.$on('addSku', row => {
      // console.log(row);
      this.$store.dispatch('spuImageList', row.id)
      this.$store.dispatch('spuSaleAttrList', row.id)
      this.$store.dispatch('attrInfoList', this.categoryId)
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
    })
  },
  beforeDestroy() {
    this.$bus.$off('addSku')
  },
  computed: {
    ...mapState({
      spuImageList: state => state.spu.spuImageList || [],
      spuSaleAttrList: state => state.spu.spuSaleAttrList || [],
      attrInfoList: (state) => state.attr.attrInfoList || [],
    })
  },
  data() {
    return {
      skuInfo: {
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
        skuDefaultImg: ''
      },
      newSpuImageList: []
    }
  },
  methods: {
    // 设为默认
    changeDefault(row) {
      console.log(row);
      this.newSpuImageList.forEach(item => {
        // console.log(item);
        item.isDefault = 0
      });
      this.skuInfo.skuDefaultImg = row.imgUrl
      row.isDefault = 1
      
    },

    // 保存sku信息
    async saveSkuInfo() {
      // this.skuInfo 
      this.attrInfoList.forEach(item => {
        if(item.attrIdOrattrValueId) {
          let [attrId, valueId] = item.attrIdOrattrValueId.split(':')
        this.skuInfo.skuAttrValueList.push({attrId, valueId})
        }
      });
      this.spuSaleAttrList.forEach(item => {
        if(item.saleAttrIdOrsaleAttrValueId) {
          let [saleAttrId, saleAttrValueId] = item.saleAttrIdOrsaleAttrValueId.split(':')
          this.skuInfo.skuSaleAttrValueList.push({saleAttrId, saleAttrValueId})
        }
      })

      let isCheckedImageList = this.newSpuImageList.filter(item => {
        return item.checked
      });
      this.skuInfo.skuImageList = isCheckedImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      console.log(this.skuInfo);
      try {
        await this.$store.dispatch('saveSkuInfo', this.skuInfo)
        this.$emit('changeIsShow', 1)
        Object.assign(this.$data,this.$options.data())
      } catch (error) {
        
      }
    },
    
    changeIsShow() {
      this.$emit('changeIsShow', 1)
      Object.assign(this.$data,this.$options.data())
    }
  },
  watch: {
    spuImageList: {
      handler() {
        this.newSpuImageList = this.spuImageList
        this.newSpuImageList.forEach(item => {
          this.$set(item, 'isDefault', 0)
        });
      }
    }
  }
}
</script>

<style scoped>

</style>