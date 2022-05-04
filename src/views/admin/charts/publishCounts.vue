<template>
  <section class="chart-container">
    <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
    <div id="chartPie" style="width: 100%; height: 400px"></div>
  </section>
</template>

<script>
import { listArchives2, categoryCount } from "@/api/article";

export default {
  name: "publishCounts",
  data() {
    return {
      msg: "",
      archives: [],
      categoriesCount: [],
      date: [],
      name: [],
      total: [],
      sum: 0,
      series: [
        {
          //新的一个柱子 注意不设stack
          name: "总数",
          type: "bar",
          barGap: "-100%", // 左移100%，stack不再与上面两个在一列
          label: {
            normal: {
              show: true, //显示数值
              position: "top", //  位置设为top
              formatter: "{c}",
              textStyle: { color: "#000" }, //设置数值颜色
            },
          },
          itemStyle: {
            normal: {
              color: "rgba(128, 128, 128, 0)", // 设置背景颜色为透明
            },
          },
          data: this.total,
        },
      ],
    };
  },
  created() {
    this.listArchives();
    this.categoryCount();
  },
  mounted() {},
  methods: {
    drawLine() {
      this.series.length = this.archives.length + 1;
      for (var i = 1; i < this.series.length; i++) {
        this.series[i] = this.archives[i - 1];
        this.series[i].type = "bar";
        this.series[i].stack = "x";
      }
      this.series[0].data = this.total;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: { text: "每月发布量统计\n总发布量：" + this.sum },
        tooltip: {},
        legend: {
          data: this.name,
        },
        xAxis: {
          data: this.date,
        },
        yAxis: {},
        series: this.series,
      });
    },

    drawPieChart() {
      this.chartPie = this.$echarts.init(document.getElementById("chartPie"));

      this.chartPie.setOption({
        title: {
          text: "各分类的文章统计",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.categoriesCount.name,
        },
        series: [
          {
            name: "数量和占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.categoriesCount,
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

    listArchives() {
      listArchives2()
        .then((data) => {
          this.date = data.data.date;
          this.archives = data.data.data;
          this.name = data.data.name;
          this.total = data.data.total;
          this.sum = data.data.sum;
          this.drawLine();
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "加载失败!",
            showClose: true,
          });
        });
    },
    categoryCount() {
      categoryCount()
        .then((data) => {
          this.categoriesCount = data.data;
          //console.log(this.categoriesCount)
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
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
</style>
