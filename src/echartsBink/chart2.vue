<template>
    <div id="chart2" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart2',
    mixins: [publics],
    props: ['param2'],
    data: function () {
      return {
        dataModel : {
          applicationCount: 0, //申报量
          clerkCount: 0, //受理量
          dealedCount: 0, //办结量
          satisfyCount: 0, //满意量
          outDateCount: 0, //超期量
          orderCount: 0, //预约量
          listCount: 0, //排队量
          personCount: 0, //人流量
        },
        indexNames: ['applicationCount', 'clerkCount', 'dealedCount', 'satisfyCount', 'outDateCount', 'orderCount', 'listCount', 'personCount'],
        indexChineseNames : ['申报量', '受理量', '办结量', '满意量', '超期量', '预约量', '排队量', '人流量']
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
      chart() {
        var charts = echarts.init(document
          .getElementById('chart2'));
        return charts;
      }

    },
    methods: {
      option(){
        var indexName =this.getDataByIndexNames(this.indexNames, this.dataModel);
        var indexChineseNames = this.indexChineseNames;
        (this.dataModel);

        var op = {
          color: ['#FFCC00'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          formatter: function(params) {
            return params[0].name + ":" + params[0].data;
          },
          grid: {
            left: '-8px',
            right: '4%',
            bottom: '7%',
            top: '10%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#35446f'
              }
            },
            splitLine: {
              show: false,
              interval: 0,
              lineStyle: {
                color: '#35446f',
              }
            },
            data: indexChineseNames, //数据来源
            axisLabel: { //用于设置坐标轴标签
              show: true,
              interval: 0,
              textStyle: {
                color: '#abbde3',
              },
            },
            triggerEvent: true,
          }],
          yAxis: [{
            show: false,
            type: 'value',
            min: 0,
            axisLine: {
              lineStyle: {
                color: '#35446f'
              }
            },
            scale: false,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#35446f',
              },
            },
            scale: true,
            axisLabel: {
              show: false,
              textStyle: {
                color: '#abbde3',
              }
            },
            nameTextStyle: {
              color: "#abbde3"
            }
          }],
          series: [{
            name: '',
            type: 'bar',
            barWidth: '60%',
            data: indexName,
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            }
          }]
        };
        return op;
      },
      makeTempData(isInit){
        var indexNames = this.indexNames;
        var that = this;
        $.each(indexNames, function(index, value) {
          if(isInit) {
            that.dataModel[value] = 0;
          } else {
            that.dataModel[value] = Math.round(Math.random() * 1000);
          }

        });
      },
      updateChart(){
        var option = this.option();
        this.chart.setOption(option);
      },
      updateChartTwo() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param2) {

          //显示数据加载
          this.chart.showLoading('default', {
            text: '数据加载中。。。',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0
          });
        }

        this.makeTempData();
        setTimeout(function() {
          if(temp == flag) {
            that.updateChart();
            that.chart.hideLoading();
          }
        }, 5000);
      },
      rendom(){
        this.makeTempData(true); //生成假数据
        this.updateChart(); //初始化图表
        this.updateChartTwo(); //加载数据更新图表
      }
    },
    watch: {
      'sidebar.collapsed': function (val) {
        var that = this;
        setTimeout(function () {
          that.updateChart();
          that.chart.resize();
        }, 300);
      }
    },
    mounted() {
      this.$nextTick(function () {
       this.rendom();

      });
    },
  }
</script>
<style>

</style>
