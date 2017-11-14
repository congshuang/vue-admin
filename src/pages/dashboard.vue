<template>
  <div class="dashboard" ref="dashboard">
    <el-row>
      <el-col :span="24">
        <div id="gotobedbar">
          <el-popover
            ref="popover"
            placement="bottom"
            width="270"
            trigger="click">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              style="margin-top: 5px" :data="areatree" :props="defaultProps" :default-expanded-keys="[2]" :default-checked-keys="[3]"
              :filter-node-method="filterNode" expand-on-click-node highlight-current @node-click="nodeClick" clearable node-key="id"
              ref="tree">
            </el-tree>
          </el-popover>
          <el-button type="text" class="icon-title" style="margin-bottom: 10px;" v-popover:popover><i class="fa fa-map-marker"></i>{{area}}</el-button>

          <el-row :gutter="8">
            <el-col :span="8"><div class="grid-content bg-purple bg-style">权利事项</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-style">服务运行</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-style">系统支撑</div></el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="24"><div class="grid-content bg-purple bg-style">数据统计</div></el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <el-col :span="12" style="padding: 5px;height: 50%;"><div class="inner-div">
                <div class="bg-top">事项数量</div>
                <div class="bg-bottom">6553</div>
              </div></el-col>
              <el-col :span="12" style="padding: 5px;height: 50%;"><div class="inner-div">
                <div class="bg-top">办事指南量</div>
                <div class="bg-bottom">7081</div>
              </div></el-col>
              <el-col :span="12" style="padding: 5px;height: 50%;"><div class="inner-div">
                <div class="bg-top">全程网申量</div>
                <div class="bg-bottom">4537</div>
              </div></el-col>
              <el-col :span="12" style="padding: 5px;height: 50%;"><div class="inner-div">
                <div class="bg">
                  <p style="width: 100%;height: 60%;font-size: 19px;">事项下沉量</p>
                  <p class="bg1">本级下放</p>
                  <p class="bg1">下放本级</p>
                </div>
                <div class="bg">
                  <p class="bg2" style="border-right: 1px grey dashed;">316</p>
                  <p class="bg2">887</p>
                </div>
              </div></el-col>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
                <chart2  :param2="showLoading" ref="ctx2"></chart2>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
                 <div class="half" style="border: 1px #eef1f6 solid;">
                   <div style="border-bottom: 1px #eef1f6 solid;">
                      <p class="tp">注册量</p>
                      <p class="bm">
                        <span style="width: 40%;display: block;float: left;box-sizing: border-box;">87</span>
                        <span style="width: 20%;display: block;float: left;box-sizing: border-box;">-</span>
                        <span style="width: 40%;display: block;float: left;box-sizing: border-box;">10%</span>
                      </p>
                   </div>
                   <div style="border-bottom: 1px #eef1f6 solid;">
                     <p class="tp">注册量</p>
                     <p class="bm">
                       <span style="width: 40%;display: block;float: left;box-sizing: border-box;">87</span>
                       <span style="width: 20%;display: block;float: left;box-sizing: border-box;">-</span>
                       <span style="width: 40%;display: block;float: left;box-sizing: border-box;">10%</span>
                     </p>
                   </div>
                   <div>
                     <p class="tp">注册量</p>
                     <p class="bm">
                       <span style="width: 40%;display: block;float: left;box-sizing: border-box;">87</span>
                       <span style="width: 20%;display: block;float: left;box-sizing: border-box;">-</span>
                       <span style="width: 40%;display: block;float: left;box-sizing: border-box;">10%</span>
                     </p>
                   </div>
                 </div>
                 <div class="half">
                   <chart3 :param3="showLoading" ref="ctx3"></chart3>
                 </div>
            </div></el-col>
          </el-row>
          <!--服务指数-->
          <el-row :gutter="8">
            <el-col :span="24"><div class="grid-content bg-purple bg-style">服务指数</div></el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart4 :param4="showLoading" ref="ctx4"></chart4>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart5 :param5="showLoading" ref="ctx5"></chart5>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart6 :param6="showLoading" ref="ctx6"></chart6>
            </div></el-col>
          </el-row>
          <!--运行趋势-->
          <el-row :gutter="8">
            <el-col :span="24"><div class="grid-content bg-purple bg-style">运行趋势</div></el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart7 :param7="showLoading" ref="ctx7"></chart7>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart8 :param8="showLoading" ref="ctx8"></chart8>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple bg-div">
              <chart9 :param9="showLoading" ref="ctx9"></chart9>
            </div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import chart2 from '../echartsBink/chart2.vue'
  import chart3 from '../echartsBink/chart3.vue'
  import chart4 from '../echartsBink/chart4.vue'
  import chart5 from '../echartsBink/chart5.vue'
  import chart6 from '../echartsBink/chart6.vue'
  import chart7 from '../echartsBink/chart7.vue'
  import chart8 from '../echartsBink/chart8.vue'
  import chart9 from '../echartsBink/chart9.vue'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        flag:null,
        showLoading:false,
        filterText: '',
        area:'北京市海淀区西三旗街道',
        areatree: [{
          id: 1,
          label: '北京市',
          children: [{
            id: 2,
            label: '北京市海淀区',
            children: [{
              id: 3,
              label: '北京市海淀区西三旗街道'
            }, {
              id: 4,
              label: '北京市海淀区苏家坨街道'
            }]
          }]
        },{
          id: 5,
          label: '四川',
          children: [{
            id: 6,
            label: '四川成都市',
            children: [{
              id: 7,
              label: '四川成都市金牛区'
            }, {
              id: 8,
              label: '四川成都市成华区'
            }, {
              id: 9,
              label: '四川成都市武侯区'
            }]
          }]
        },{
          id: 10,
          label: '陕西'
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
    },
    components: {
      chart2,
      chart3,
      chart4,
      chart5,
      chart6,
      chart7,
      chart8,
      chart9,
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      nodeClick(data){
        this.area = data.label;
        this.showLoading = true;
        this.$refs.ctx2.rendom();
        this.$refs.ctx3.rendom();
        this.$refs.ctx4.rendom();
        this.$refs.ctx5.rendom();
        this.$refs.ctx6.rendom();
        this.$refs.ctx7.rendom();
        this.$refs.ctx8.rendom();
        this.$refs.ctx9.rendom();
      }
    },
    mounted() {
      this.$nextTick(function () {

      });
    },
    watch: {
      'sidebar.collapsed': function (val) {
        this.chart2 = {}
        var chart = this.chart2;
        var that = this;
        setTimeout(function () {

        }, 300);
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style scoped>

  #gotobedbar {
    width: 100%;
    min-height: 500px;
    margin-right: 10px;
  }
  .icon-title{
    font-size: 20px;
  }
  .icon-title i{
    margin-right: 5px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #1d90e6;
  }
  .bg-style{
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 36px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-div{
    height: 300px;
    padding: 10px;
  }
  .inner-div{
    border: 1px #eef1f6 solid;
    height: 100%;
    border-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
  }
  .bg-top{
    width: 100%;
    height: 40%;
    text-align: left;
    font-size: 20px;
    line-height: 40px;
    box-sizing: border-box;
  }
  .bg-bottom{
    width: 100%;
    height: 60%;
    text-align: right;
    font-size: 40px;
    color: #fff;
    box-sizing: border-box;
  }
  .bg{
    width: 100%;
    height: 50%;
    box-sizing: border-box;
  }
  .bg1{width: 50%;height: 35%;font-size: 17px;float: left;text-align: center;}
  .bg2{width: 50%;height: 100%;font-size: 30px;float: left;text-align: center;color: #fff;}
  .half{
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    float: left;
  }
  .half div{
    width: 100%;
    height: 33%;
    box-sizing: border-box;
  }
  .tp{
    width: 100%;
    height: 40%;
    box-sizing: border-box;
    font-size: 20px;
  }
  .bm{
    width: 100%;
    height: 60%;
    box-sizing: border-box;
    font-size: 35px;
    color: #fff;
    text-align: center;
  }
</style>
