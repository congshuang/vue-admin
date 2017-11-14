<template>
  <div id="chart3" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart3',
    mixins: [publics],
    props: ['param3'],
    data: function () {
      return {
        dataModel : {
          shareField: 0,
          getField: 0
        },
        showLoading:this.param3,
        indexNames: ['shareField', 'getField'],
        indexChineseNames : ['共享字段', '获取字段']
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
      chart:function () {
        var charts = echarts.init(document
          .getElementById('chart3'));
        return charts;
      },

    },
    methods: {
      option(){
        var indexName =this.getDataByIndexNames(this.indexNames, this.dataModel);
        var indexChineseNames = this.indexChineseNames;
        console.log(this.dataModel);

        var op = {
          color: ['#F08529'],
          title: {
            text: '数据交换',
            left: 'center',
            top: '5px',
            textStyle: {
              fontSize: 15,
              fontWeight: 'normal',
              fontFamily: '微软雅黑',
              color: '#abbde3',
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '-10px',
            //right: '4%',
            bottom: '7%',
            top: '20%',
            containLabel: true
          },
          formatter: function(params) {
            return params[0].name + ":" + params[0].data;
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
            name: '直接访问',
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
      updateChartThree() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param3) {
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
            console.log(1);
            that.updateChart();
            that.chart.hideLoading();
          }
        }, 5000);
      },
      rendom(){
        this.makeTempData(true); //生成假数据
        this.updateChart(); //初始化图表
        this.updateChartThree(); //加载数据更新图表
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
