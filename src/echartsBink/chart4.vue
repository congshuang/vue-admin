<template>
  <div id="chart4" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart4',
    mixins: [publics],
    props: ['param4'],
    data: function () {
      return {
        dataModel : {
          matterCount: 0, //事项数量
          workGuideCount: 0, //办事指南
          onlineApplicationCount: 0, //全程网申量
          downToCurrentCount: 0, //下发本级
          currentToDownCount: 0, //本级下放
        },
        showLoading:this.param4,
        indexNames: ['matterCount', 'downToCurrentCount', 'currentToDownCount', 'onlineApplicationCount', 'workGuideCount'],
        indexChineseNames : ['事项数量', '事项下沉\n(下放本级)', '事项下沉\n(本级下放)', '全程网申量', '办事指南量'],
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
          .getElementById('chart4'));
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
            text: '权利事项指数',
            left: '5px',
            top: '5px',
            textStyle: {
              color: '#abbde3',
            }
          },
          tooltip: {},
          radar: {
            // shape: 'circle',
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
              },
              textStyle: {
                //color: '#abbde3',
              }
            },
            //自定义方法
            indicator: indicator,
          },
          series: [{
            name: '',
            type: 'radar',
            lineStyle: {
              normal: {
                color: '#FFCC00',
              }
            },
            data: [{
              value: indexName, //自定义方法
              name: '权利事项指数'
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
      updateChartFour() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param4) {
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
        this.updateChartFour(); //加载数据更新图表
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
