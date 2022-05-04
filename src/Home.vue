<template>
  <div id="home">
    <el-container>

    	<base-header :activeIndex="activeIndex"></base-header>

		<router-view class="me-container"/>

		<!-- <echarts class="me-container"></echarts> -->

		<base-footer v-show="footerShow"></base-footer>

	</el-container>

  </div>

</template>

<script>
import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/views/BaseHeader'

export default {
  name: 'Home',
  data (){
  	return {
		activeIndex: '/',
  		footerShow:true,

		sensitiveWord:'',
      	titleMsg:'',
      	sensitiveWordNotice:false,

  	}
  },

// 	watch: {
//     sensitiveWord:function (val) {
//       if(this.judgeEensitiveWord(val)) {
//         this.sensitiveWordNotice = true
//       }else {
//         this.sensitiveWordNotice = false
//       }
//     }
//   },


  components:{
  	'base-header':BaseHeader,
  	'base-footer':BaseFooter,
  },
  beforeRouteEnter (to, from, next){
  	 next(vm => {
    	vm.activeIndex = to.path
  	})
  },
  beforeRouteUpdate (to, from, next) {
	  if(to.path == '/'){
	  	this.footerShow = true
	  }else{
	  	this.footerShow = false
	  }
	  this.activeIndex = to.path
	  next()
	}
}
</script>

<style>
.el-container{
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
}

.me-container{
  margin: 100px auto 140px;
}
</style>
