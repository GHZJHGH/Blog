<template>
  <div v-title data-title="MyBlog">
    <el-container>

      <el-aside>

        <div class="me-category-header">
          <img class="me-view-picture" :src="user.avatar">
          <div>
            <h2>{{user.name}}</h2>
          </div>
        </div>

        <div class="me-category-header">
          <el-button @click="my()" >我的文章</el-button>
        </div>

        <div class="me-category-header">
          <el-button @click="comment()" >评论文章</el-button>
        </div>

        <!-- <div class="me-category-header">
          <el-button @click="star()" >我的收藏</el-button>
        </div> -->

      </el-aside>

      <el-main class="me-articles">

        <router-view></router-view>

      </el-main>

    </el-container>
  </div>
</template>

<script>
  import CardMe from '@/components/card/CardMe'
  import CardArticle from '@/components/card/CardArticle'
  import CardArchive from '@/components/card/CardArchive'
  import CardTag from '@/components/card/CardTag'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'

  export default {
    name: 'me',
    created() {
      this.getHotArtices()
      this.getNewArtices()
      this.getHotTags()
      this.listArchives()
    },
    data() {
      return {
        hotTags: [],
        hotArticles: [],
        newArticles: [],
        archives: []
      }
    },
    computed: {
      user() {
        let login = this.$store.state.account.length != 0
        let name = this.$store.state.name
        let avatar = this.$store.state.avatar
        return {
          login, name ,avatar
        }
      }
    },
    methods: {

      my(){
        this.$router.push({path: `/me/my/${this.$store.state.id}`})
      },
      comment(){
        this.$router.push({path: `/me/comment/${this.$store.state.id}`})
      },
      star(){
        this.$router.push({path: `/me/star/${this.$store.state.id}`})
      },

    },
    components: {
      'card-me': CardMe,
      'card-article': CardArticle,
      'card-tag': CardTag,
      ArticleScrollPage,
      CardArchive
    }
  }
</script>

<style scoped>

  .el-container {
    width: 960px;
  }

  .el-aside {
    margin-right: 20px;
    width: 260px;
  }

  .el-main {
    padding: 0px;
    line-height: 16px;
  }

  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 20px;
  }
  .me-category-header {
    border-radius:25px;
    font-weight: 600;
    text-align: center;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    margin-top: 10px;

  }
  .el-button{
    border-radius:25px;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    width: 300px;

  }
  .me-view-picture {
    width: 55px;
    height: 55px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }

</style>
