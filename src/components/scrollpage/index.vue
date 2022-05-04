<template>

  <div ref="scroll" id="scroll-page" style="overflow: hidden">
    <slot></slot>
    <div
      style="height: 40px;margin-top: 10px;z-index: 1"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(245,245,245)">
      </div>
  </div>

</template>

<script>
  export default {
    props: {
      loading: Boolean,
      noData: Boolean,
      offset: Number
    },
    name: "index",
    mounted() {
      //绑定事件监听，滚动的时候触发
      window.addEventListener('scroll', this.handleScroll, false);
    },
    beforeDestroy() {
      //移除监听事件
      window.removeEventListener('scroll', this.handleScroll)
    },
    data() {
      return {
        scrollAction: {
          x: 'undefined',
          y: 'undefined'
        }
      }
    },
    methods: {
      handleScroll(e) {
        var that = this
        if (!that.noData) {
          //如果有数据，触发
          let curHeight = document.documentElement.scrollTop || document.body.scrollTop
          var scrollPage = document.getElementById('scroll-page');
          //判断是否到达底部
          if ((curHeight + window.innerHeight >= that.$refs.scroll.offsetHeight + that.offset) && that.isDownDirection()) {
            //加载状态
            if (!that.loading) {
              //调用load加载数据
              that.$emit('load')
            }
          }
        }
      },
      isDownDirection() {
        if (typeof this.scrollAction.x == 'undefined') {
          this.scrollAction.x = window.pageXOffset;
          this.scrollAction.y = window.pageYOffset;
        }
        var diffX = this.scrollAction.x - window.pageXOffset;
        var diffY = this.scrollAction.y - window.pageYOffset;

        this.scrollAction.x = window.pageXOffset;
        this.scrollAction.y = window.pageYOffset;

        if (diffX < 0) {
          // Scroll right
        } else if (diffX > 0) {
          // Scroll left
        } else if (diffY < 0) {
          // Scroll down
          return true
        } else if (diffY > 0) {
          // Scroll up
        } else {
          // First scroll event
        }
        return false
      }

    }
  }
</script>

<style scoped>

</style>
