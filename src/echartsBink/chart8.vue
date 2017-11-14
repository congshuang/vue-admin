<template>
  <div id="chart8" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart8',
    mixins: [publics],
    props: ['param8'],
    data: function () {
      return {
        dataModel : {
          xAxis: [],
          lineCount: [], //排队量
          orderCount: [], //预约量
          outTimeCount: [], //超期量
          dealedCount: [], //办结量
          clerkCount: [], //受理量
          applicationCount: [] //申报量
        },
        showLoading:this.param8,
        indexNames:  ['lineCount', 'orderCount', 'outTimeCount', 'dealedCount', 'clerkCount', 'applicationCount'],
        indexChineseNames :  ['排队量', '预约量', '超期量', '办结量', '受理量', '申报量'],
        lineWidth : 2
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
      chart:function () {
        var charts = echarts.init(document
          .getElementById('chart8'));
        return charts;
      },

    },
    methods: {
      makeTempData(isInit){
        var indexNames = this.indexNames;
        var that = this;
        $.each(indexNames, function(index, value) {
          if(index == 0) {
            that.dataModel.xAxis = [];
          }
          that.dataModel[value] = [];
        });

        if(isInit) {
          that.dataModel.xAxis.push('无数据');
          $.each(indexNames, function(index, value) {
            that.dataModel[value].push(0);
          });

          return;
        }

        //构建横坐标
        for(var i = 0; i < 12; i++) {
          that.dataModel.xAxis.push('2017-' + (i + 1));
        }

        for(var i = 0; i < that.dataModel.xAxis.length; i++) {
          if(i == 0) {
            $.each(indexNames, function(index, value) {
              that.dataModel[value].push(Math.round(Math.random() * 10000));
            });
          } else {
            $.each(indexNames, function(index, value) {
              var temp = Math.round(Math.random() * 10) % 2 == 0 ? -1000 : 1000;
              var tempValue = (that.dataModel[value][i - 1] + temp) > 0 ? temp : 2000;
              that.dataModel[value].push(that.dataModel[value][i - 1] + tempValue);
            });
          }
        }
      },
      updateChart(){
        var indexNames = this.indexNames;
        var indexChineseNames = this.indexChineseNames;
        var lineWidth = this.lineWidth;
        var dataModel = this.dataModel;
        var getLegend = this.getLegend(indexNames, indexChineseNames);
        var getSeries = this.getSeries(indexNames, indexChineseNames, dataModel, lineWidth);

        var option = {
          grid: {
            left: '3%',
            right: '3%',
            bottom: '6%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: getLegend,
            left: 'center',
            top: '10px',
            textStyle: {
              color: '#abbde3'
            },

          },
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#35446f'
              }
            },
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: '#35446f',
              }
            },
            data: dataModel.xAxis, //数据来源
            axisLabel: { //用于设置坐标轴标签
              show: true,
              interval: 0,
              textStyle: {
                color: '#abbde3',
              },
              formatter: function(value, index) {
                if(value == null || value == '无数据') {
                  return '无数据';
                }
                var array = value.split('-');
                array[0] = array[0].substr(2, 2) + '年';
                array[1] = array[1] + '月';
                return array.join('\n')
              }
            },

            triggerEvent: true,
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#35446f'
              }
            },
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#35446f',
              },
            },
            scale: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#abbde3',
              }
            },
            nameTextStyle: {
              color: "#abbde3"
            }
          }],
          series: getSeries,
        };
        this.chart.setOption(option);
      },
      updateChartEight() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param8) {
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
        this.updateChartEight(); //加载数据更新图表
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
