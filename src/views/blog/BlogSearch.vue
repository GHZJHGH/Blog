<template>
  <div class="me-ct-body">
    <el-container class="me-ct-container">
      <el-main>

        <div class="me-ct-articles">
          <article-scroll-page v-bind="article"></article-scroll-page>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'

  export default {
    name: 'BlogSearch',
    components: {
      ArticleScrollPage
    },

    watch: {
      '$route'() {
        if (this.$route.params.input) {
          console.log(this.$route.params.input)
          this.article.query.title = this.$route.params.input
        }
      }
    },
    data() {
      return {
        article: {
            query: {
                title: this.$route.params.input
          }
        },
      }
    },
    methods: {

    }
}

</script>

<style>
  .me-ct-body {
    margin: 60px auto 140px;
    min-width: 100%;
  }

  .el-main {
    padding: 0;
  }


  .me-ct-articles {
    width: 640px;
    margin: 30px auto;
  }

</style>
