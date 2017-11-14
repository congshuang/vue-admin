<template>
  <div id="chart5" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart5',
    mixins: [publics],
    props: ['param5'],
    data: function () {
      return {
        dataModel : {
          applicationCount: 0, //申报量
          personCount: 0, //人流量
          listCount: 0, //排队量
          orderCount: 0, //预约量
          outDateCount: 0, //超期量
          dealedCount: 0, //办结量
          clerkCount: 0, //受理量
        },
        indexNames:  ['applicationCount', 'personCount', 'listCount', 'orderCount', 'outDateCount', 'dealedCount', 'clerkCount'],
        indexChineseNames :  ['申报量', '人流量', '排队量', '预约量', '超期量', '办结量', '受理量'],
        controLabel : 0
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
      chart:function () {
        var charts = echarts.init(document
          .getElementById('chart5'));
        return charts;
      },

    },
    methods: {
      option(){
        var indexName =this.getDataByIndexNames(this.indexNames, this.dataModel);
        var indicator = this.generateIndicator(this.indexNames, this.indexChineseNames, this.dataModel)
        var that = this;

        var op = {
          title: {
            text: '服务运行指数',
            left: '5px',
            top: '5px',
            textStyle: {
              color: '#abbde3',
            }
          },
          tooltip: {},
          radar: {
            name: {
              textStyle: {
                color: '#abbde3',
              }
            },
            axisLabel: {
              show: true,
              formatter: function(value, index) {
                if(that.controLabel < 6) {
                  that.controLabel++;
                  return value;
                }
              }
            },
            indicator: indicator,
          },
          series: [{
            name: '',
            type: 'radar',
            lineStyle: {
              normal: {
                color: 'yellow'
              }
            },
            data: [{
              value: indexName,
              name: '服务运行指数'
            }, ]
          }]
        };
        this.controLabel = 0;
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
      updateChartFive() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param5) {
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
        this.updateChartFive(); //加载数据更新图表
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
