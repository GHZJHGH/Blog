<template>
  <el-card class="me-area" :body-style="{ padding: '18px' }">

    <div class="me-article-header">
      <!-- 标题   -->
      <a @click="view(id)" class="me-article-title">{{title}}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
      <!-- 评论数 -->
      <span class="me-pull-right me-article-count">
	    	<i class="me-icon-comment"></i>&nbsp;{{commentCounts}}
	    </span>
      <!-- 浏览数 -->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{viewCounts}}
	    </span>
    </div>

    <!-- 简介 -->
    <div class="me-artile-description">
      {{summary}}
    </div>
    <div class="me-article-footer">
      <!-- 作者 -->
	  	<span class="me-article-author">
	    	<i class="me-icon-author"></i>&nbsp;{{author}}
	    </span>
      <!-- 标签 -->
      <el-tag v-for="t in tags" :key="t.tagName" size="mini" type="success">{{t.tagName}}</el-tag>
      <!-- 发表时间 -->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createDate | format}}
	    </span>

    </div>
  </el-card>
</template>

<script>
  import { formatTime } from "../../utils/time";

  export default {
    name: 'ArticleItem',
    props: {
      id: String,
      weight: Number,
      title: String,
      commentCounts: Number,
      viewCounts: Number,
      summary: String,
      author: String,
      tags: Array,
      createDate: String
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        this.$router.push({path: `/view/${id}`})
      }
    }
  }
</script>

<style scoped>
.me-area{
  border-radius:25px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

  .me-article-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
    /* background-color: palegoldenrod; */
  }

  .me-article-title {
    font-weight: 600;
  }

  .me-article-icon {
    padding: 3px 8px;
  }

  .me-article-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-artile-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  .me-article-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .el-tag {
    margin-left: 6px;
  }

</style>
