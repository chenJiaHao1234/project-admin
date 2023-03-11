<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" @click="addAttr" :disabled="category3Id == ''"
      >添加属性</el-button
    >
    <!-- 对话框 -->
    <el-dialog title="添加属性" :visible.sync="outerVisible" @close="closeDialog">
      <el-form class="demo-ruleForm" label-width="80px">
        <el-form-item label="属性名">
          <el-input
            v-model="attrInfo.attrName"
            placeholder="请输入属性名"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addAttrValue">添加新属性值</el-button>
        </el-form-item>
        <el-form-item
          label="属性值" v-for="(attrValue, index) in attrInfo.attrValueList">
          <el-input
            v-model="attrValue.valueName"
            placeholder="请输入属性值"
            style="width: 300px"
          ></el-input>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            style="margin-left: 5px"
            @click="delAttrValue(index)"
          ></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveAttrInfo">保存</el-button>
          <el-button @click="outerVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 展示列表 -->
    <el-table :data="attrInfoList" :border="true">
      <el-table-column
        label="序号"
        width="100px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="属性名称"
        align="center"
        width="150px"
        prop="attrName"
      ></el-table-column>
      <el-table-column label="属性值列表">
        <template slot-scope="{ row, $index }">
          <div class="attrVal" v-for="attrValue in row.attrValueList">
            {{ attrValue.valueName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="changeValName(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delAttr(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 对话框显示与隐藏
      outerVisible: false,
      //
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: "",
        categoryLevel: 3,
        id: "",
      },
    };
  },
  computed: {
    ...mapState({
      attrInfoList: (state) => state.attr.attrInfoList,
      // 三级分类id
      category3Id: (state) => state.attr.category3Id
    }),
  },
  methods: {
    // 修改属性值按钮
    changeValName(row) {
      // 深拷贝 
      this.attrInfo = JSON.parse(JSON.stringify(row));
      this.outerVisible = true;
    },
    // 添加新属性值
    addAttrValue() {
      let newAttrValue = {
        attrId: this.attrInfo.id,
        id: "",
        valueName: "",
      };
      this.attrInfo.attrValueList.push(newAttrValue)
    },
    // 删除属性值
    delAttrValue(index) {
      if(this.attrInfo.attrValueList.length > 1)
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 关闭对话框
    closeDialog() {
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: "",
        categoryLevel: 3,
        id: "",
      }
    },
    // 对话框保存按钮
    async saveAttrInfo() {
      // 判断属性名是否为空
      if(this.attrInfo.attrName !== '') {
        // 过滤掉属性值为空的，把属性名存入valueNameList
        let valueNameList = []
        this.attrInfo.attrValueList.forEach(attrValue => {
          if(attrValue.valueName !== '') {
            valueNameList.push(attrValue.valueName)
          }
        })
        // 判断是否有空的属性值
        if(valueNameList.length == this.attrInfo.attrValueList.length) {
          // 数组去重
          let newValueNameList = valueNameList.filter((valueName, index) => {
             return valueNameList.indexOf(valueName) == index
          })
          // 判断是否有重复的属性值
          if(newValueNameList.length == valueNameList.length) {
            // 发请求
            try {
              await this.$store.dispatch('saveAttrInfo', this.attrInfo)
              this.$bus.$emit('updateAttrInfoList')
              this.outerVisible = false
            } catch (error) {
              
            }
          }else {
            this.$message({
              message: '属性值不能重复',
              type: 'error'
            })
          }

        }else {
          this.$message({
            message: '属性值不能为空',
            type: 'error'
          })
        }
      }else{
        this.$message({
          message: '属性名不能为空',
            type: 'error'
        })
      }
      
    },
    // 删除某个属性(整条属性)
    async delAttr(row) {
      console.log(row);
      try {
        await this.$store.dispatch('delAttr', row.id)
        this.$bus.$emit('updateAttrInfoList')
      } catch (error) {
        
      }
    },
    // 添加属性按钮
    addAttr() {
      this.attrInfo.categoryId = this.category3Id
      if(!this.attrInfo.attrValueList.length) {
        this.addAttrValue()
      }
      this.outerVisible = true
    }
  },
};
</script>

<style scoped>
.attrVal {
  float: left;
  margin: 5px;
  background-color: #409eff;
  padding: 0 5px;
  border-radius: 4px;
  color: #fff;
}
</style>