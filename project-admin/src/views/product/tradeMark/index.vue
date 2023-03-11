<template>
  <div class="box">
    <el-button
      type="primary"
      class="btn"
      icon="el-icon-plus"
      @click="openDialog('add')"
      >添加品牌</el-button
    >
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="rulesForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tradeMarkName"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌logo"
          :label-width="formLabelWidth"
          prop="logo"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataTradeMark">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单 -->
    <el-table
      :data="records"
      :show-header="true"
      class="table"
      :border="true"
      
    >
      <el-table-column
        label="序号"
        align="center"
        width="100px"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="logo" align="center" prop="logoUrl">
        <template slot-scope="{ row, column, $index }">
          <img :src="row.logoUrl" style="width: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="openDialog('updata', row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delTradeMark(row)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="tradeMarkList.total"
      class="pagination"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 当前页码
      page: 1,
      // 一页展示多少条数据
      limit: 5,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
      },
      formLabelWidth: "120px",
      row: "",
      // 上传图片
      imageUrl: "",
      openDialogType: "",
      rules: {
        tradeMarkName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        logo: [{ required: true, message: "请添加品牌logo", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 发请求
    getDate() {
      let { page, limit } = this;
      this.$store.dispatch("tradeMarkList", { page, limit });
    },

    // 改变分页器页码
    currentChange($event) {
      this.page = $event;
      console.log(this.page);
      this.getDate();
    },

    //删除
    async delTradeMark(row) {
      try {
        await this.$store.dispatch("delTradeMark", row.id);
        this.getDate();
      } catch (error) {}
    },
    // 打开对话框时确认操作类型(添加或修改)
    openDialog(type, row) {
      this.openDialogType = type;
      this.row = row;
      this.dialogFormVisible = true;
      if (type == "add") {
        this.form.name = "";
        this.imageUrl = "";
      } else {
        this.form.name = row.tmName;
        this.imageUrl = row.logoUrl;
      }
    },
    // 对话框确认按钮
    updataTradeMark() {
      this.$refs.rulesForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          // 判断是添加还是修改
          if (this.openDialogType == "add") {
            let tmName = this.form.name;
            let logoUrl = this.imageUrl;
            if (tmName !== "" && logoUrl !== "") {
              try {
                await this.$store.dispatch("addTradeMark", { tmName, logoUrl });
                this.getDate();
              } catch (error) {}
            }
          } else {
            let id = this.row.id;
            let tmName = this.form.name;
            let logoUrl = this.imageUrl;
            try {
              await this.$store.dispatch("changeTradeMark", {
                id,
                tmName,
                logoUrl,
              });
              this.getDate();
            } catch (error) {}
          }
        }
      });
    },
  },
  computed: {
    ...mapState({
      tradeMarkList: (state) => state.tradeMark.tradeMarkList,
    }),
    ...mapGetters(["records"]),
  },
};
</script>


<style>
.box {
  padding: 20px;
}
.btn {
  margin-bottom: 20px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>