<template>
  <div id="chart6" style="height: 280px"></div>
</template>
<script>
  import echarts from 'echarts';
  import publics from './publics';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'chart6',
    mixins: [publics],
    props: ['param6'],
    data: function () {
      return {
        dataModel : {
          registry: 0,
          getField: 0,
          shareField: 0,
          stayTime: 0,
          login: 0,
          relogin: 0,
        },
        showLoading:this.param6,
        indexNames:  ['registry', 'getField', 'shareField', 'stayTime', 'login', 'relogin'],
        indexChineseNames :  ['注册量', '获取字段', '共享字段', '停留时间', '登录量', '重复登录量'],
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
          .getElementById('chart6'));
        return charts;
      },

    },
    methods: {
      option(){
        var indexName =this.getDataByIndexNames(this.indexNames, this.dataModel);
        var indicator = this.generateIndicator(this.indexNames, this.indexChineseNames, this.dataModel, 1);
        var that = this;

        var op = {
          title: {
            text: '系统支撑指数',
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
              }
            },
            indicator: indicator,
          },
          series: [{
            name: '',
            type: 'radar',
            lineStyle: {
              normal: {
                color: 'blue',
              }
            },
            data: [{
              value: indexName,
              name: '系统支撑指数'
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
            if('registry' == value) {
              that.dataModel[value] = 1;
            } else {
              that.dataModel[value] = '0.' + Math.round(Math.random() * 9);
            }
          }
        });
      },
      updateChart(){
        var option = this.option();
        this.chart.setOption(option);
      },
      updateChartSix() {
        var flag = new Date();
        var that = this;
        var temp = flag;
        if(this.param6) {
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
        this.updateChartSix(); //加载数据更新图表
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
