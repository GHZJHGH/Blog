<template>
  <div id="register" v-title data-title="注册">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
      </video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>注册</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account"></el-input>
        </el-form-item>

        <el-form-item prop="nickname">
          <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            type="password"
            v-model="userForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-upload
              class="upload-demo"
              action="auto"
              :limit="1"
              :on-exceed="handleExceed"
              :http-request="uploadSectionFile"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传头像</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2MB
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="success" @click.native.prevent="register('userForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/login";
import { upload } from "@/api/upload";

export default {
  name: "Register",
  data() {
    return {
      userForm: {
        account: "",
        nickname: "",
        password: "",
        avatar: "",
      },
      uploadFile: "",
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "不能大于12个字符,不能小于6个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    register(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userForm.avatar === "") {
            this.$message.warning("请上传头像");
            return false;
          }
          //1.请求后端接口进行注册
          //2.返回一个token
          //3.前端存储token，并让其他组件也能知道(涉及状态流转)
          that.$store
            .dispatch("register", that.userForm)
            .then(() => {
              that.$message({
                message: "注册成功 快写文章吧",
                type: "success",
                showClose: true,
              });
              that.$router.push({ path: "/" });
            })
            .catch((error) => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true,
                });
              }
            });
        } else {
          return false;
        }
      });
    },
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
            this.userForm.avatar = data.data;
            console.log(this.userForm.avatar);
          } else {
            this.$message.success("上传失败");
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

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 480px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  margin-top: 100px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5fb878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}
</style>
