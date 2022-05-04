<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartPie" style="width: 100%; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <card-article
          cardHeader="浏览量最多的五篇文章"
          :articles="hotArticles"
        ></card-article>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { viewCount } from "@/api/article";
import CardArticle from "@/components/card/CardArticle";
import { getHotArtices } from "@/api/article";

export default {
  name: "publishCounts",
  data() {
    return {
      msg: "",
      viewCounts: [],
      hotArticles: [],
    };
  },
  components: {
    "card-article": CardArticle,
  },
  created() {
    this.viewCount();
    this.getHotArtices();
  },
  mounted() {},
  methods: {
    drawPieChart() {
      this.chartPie = this.$echarts.init(document.getElementById("chartPie"));

      var total = 0;
      for (var i = 0; i < this.viewCounts.length; i++) {
        total += this.viewCounts[i].value;
      }

      this.chartPie.setOption({
        title: {
          text: "各分类的浏览量统计",
          subtext: "文章总浏览量：" + total,
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.viewCounts.name,
        },
        series: [
          {
            name: "数量和占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.viewCounts,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    viewCount() {
      viewCount()
        .then((data) => {
          this.viewCounts = data.data;
          //console.log(this.viewCounts)
          this.drawPieChart();
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "加载失败!",
            showClose: true,
          });
        });
    },
    getHotArtices() {
      let that = this;
      getHotArtices()
        .then((data) => {
          that.hotArticles = data.data;
        })
        .catch((error) => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热文章加载失败!",
              showClose: true,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  /* padding: 30px 20px; */
}
</style>
