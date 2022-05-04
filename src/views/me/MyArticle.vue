<template>
  <div class="me-ct-body">
    <el-container class="me-ct-container">
      <el-main>

        <div class="me-ct-articles">
          <article-item class="item" v-for="a in articles" :key="a.id" v-bind="a"></article-item>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  import {getArticleByAuthorId} from '@/api/article'

  export default {
    name: 'MyArticle',
    components: {
      'article-item': ArticleItem,
      ArticleScrollPage
    },
    created(){
      this.getArticleByAuthorId()
    },
    data() {
      return {
        articles: {

        },
      }
    },
    methods: {
      getArticleByAuthorId(){
        let that = this
        getArticleByAuthorId(this.$route.params.authorId).then(data => {
          that.articles = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '加载失败!', showClose: true})
          }

        })
      },
    }
}

</script>

<style>
  .me-ct-body {
    min-width: 100%;
  }

  .el-main {
    padding: 0;
  }


  .me-ct-articles {
    width: 640px;
  }
  .item{
    margin-top: 10px;
  }

</style>
