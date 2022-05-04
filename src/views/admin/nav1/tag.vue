<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getTag">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="Tag"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="60"> </el-table-column>
      <el-table-column prop="tagName" label="名称" width="120" sortable>
      </el-table-column>

      <el-table-column prop="avatar" label="图标" width="120" sortable>
        <template scope="scope">
          　　　　 <img :src="scope.row.avatar" width="50" height="50" /> 　　
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button
        type="danger"
        @click="batchRemove"
        :disabled="this.sels.length === 0"
        >批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="5"
        :total="total"
        style="float: right"
      >
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
        ref="editForm"
      >
        <el-form-item label="名称" prop="tagName">
          <el-input
            v-model="editForm.tagName"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="图标">
          <el-upload
            class="upload-demo"
            action="auto"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadSectionFile"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传图标</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="editSubmit"
          :loading="editLoading"
          >提交</el-button
        >
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addForm"
      >
        <el-form-item label="名称" prop="tagName">
          <el-input type="textarea" v-model="addForm.tagName"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="upload-demo"
            action="auto"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadSectionFile"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传图标</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="addSubmit"
          :loading="addLoading"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "@/utils/util";
//import NProgress from 'nprogress'
import {
  getTagListPage,
  batchRemoveTag,
  addTag,
  removeTag,
  editTag
} from "@/api/admin";
import { upload } from "@/api/upload";

export default {
  data() {
    return {
      filters: {
        name: "",
      },
      Tag: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        tagName: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      //编辑界面数据
      editForm: {
        tagName: "",
        avatar: "",
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        tagName: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      //新增界面数据
      addForm: {
        tagName: "",
        avatar: "",
      },
      //图片
      uploadFile: "",
    };
  },
  mounted() {
    this.getTag();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getTag();
    },
    //获取用户列表
    getTag() {
      let para = {
        page: this.page,
        name: this.filters.name,
      };
      this.listLoading = true;
      //NProgress.start();
      getTagListPage(para).then((res) => {
        this.total = res.data.data.total;
        this.Tag = res.data.data.data;
        console.log(this.Tag);
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          console.log(row.id)
          let para = { id: row.id };
            removeTag(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getTag();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        tagName: "",
        avatar: "",
      };
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            editTag(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getTag();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            addTag(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getTag();
            });
          });
        }
      });
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function () {
      var ids = this.sels.map((item) => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveTag(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getTag();
          });
        })
        .catch(() => {});
    },
    //图片上传相关
    uploadSectionFile(param) {
      let fileObj = param.file;

      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg",
        });
      } else if (fileObj.type === "image/png") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png",
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
      this.upload();
    },
    upload() {
      var formdata = new FormData(); // FormData 对象
      formdata.append("image", this.uploadFile); // 文件对象
      upload(formdata)
        .then((data) => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          if (data.success) {
            this.$message.success("上传成功");
            this.addForm.avatar = data.data;
            this.editForm.avatar = data.data;
            console.log(this.addForm.avatar);
          } else {
            console.log("失败");
            this.$message({
              message: data.msg,
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((err) => {
          this.$message({ message: err, type: "error", showClose: true });
        });
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一张图片`);
    },
  },
};
</script>

<style>
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
