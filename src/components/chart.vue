<template id='chart'>
  <div class="chart">
    <div id="main" style="width: 600px; height: 600px;"></div>
    <div id="main1" style="width: 600px; height: 600px;"></div>
    <button @click="toFather">给父组件传值</button>
  </div>
</template>        

<script>
export default {
  name: "chart",
  data() {
    return {
      childData1: [],
      value1: "啦啦啦"
    };
  },
  props: ["childData"],
  methods: {
    toFather() {
      this.$emit("toFatherFn", this.value1);
    },

    init() {
      var myChart = this.echarts.init(document.getElementById("main"));
      var options = {
        title: {
          text: "入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.childData1
          }
        ]
      };
      myChart.setOption(options);
    },
    init1() {
      var myChart1 = this.echarts.init(document.getElementById("main1"));

      var option1 = {
        title: {
          text: "基础雷达图"
        },
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "销售（sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Techology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）"
              }
            ]
          }
        ]
      };

      myChart1.setOption(option1);
    }
  },
  beforeCreate() {},
  created() {
    this.childData1 = this.childData;
  },
  beforeMount() {},
  mounted() {
    console.log(this.echarts);
    this.init();
    this.init1();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
    childData(val, oldVal) {
      console.log(val);
      this.childData1 = val;
      this.init();
    }
  }
};
</script>    

<style scoped>
.chart {
  width: 600px;
  height: auto;
}
</style>