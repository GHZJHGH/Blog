<template>
  <el-card>
    <template v-if="!user.login">
      <h1 class="me-author-name">name</h1>
    </template>
    <template v-else>
        <h1 class="me-author-name" >{{user.name}}</h1>
    </template>
    <div class="me-author-tool">
      <!-- <i @click="showTool(qq)" :title="qq.title" class="iconfont icon-qq"></i> -->
      <i @click="toMe()" :title="me.title" class="el-icon-user-solid"></i>
    </div>
  </el-card>

</template>

<script>
  export default {
    name: 'CardMe',
    data() {
      return {
        // qq: {title: 'QQ', message: '2198462039'},
        me: {title: '个人中心'}
      }
    },
    computed: {
      user() {
        let login = this.$store.state.account.length != 0
        let name = this.$store.state.name
        return {
          login, name
        }
      }
    },
    methods: {
      showTool(tool) {
        this.$message({
          duration: 0,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: '<strong>' + tool.message + '</strong>'
        });
      },
      toMe(){
        // console.log(this.user.name === '')
        if(this.user.name === ''){
          this.$message({
            type: 'warning',
            message: '请先登录'
          })
        }else{
          this.$router.push({path: `/me/My/${this.$store.state.id}`})
        }
      }
    }
  }
</script>

<style scoped>
  .el-card{
    border-radius:25px;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }
  .me-author-name {
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid #5FB878;
  }

  .me-author-description {
    padding: 8px 0;
  }

  .me-icon-job {
    padding-left: 16px;
  }

  .me-author-tool {
    text-align: center;
    padding-top: 10px;
  }

  .me-author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
  }
</style>
