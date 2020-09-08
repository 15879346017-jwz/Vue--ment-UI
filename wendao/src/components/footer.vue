<template>
      <div>
          <div class='one' v-if="checked=='home'">
               <myHome></myHome>
          </div>
          <div class='one' v-else>
               <centers></centers>
          </div>
          <router-view></router-view>
          <mt-tabbar v-model="checked" fixed>
              <mt-tab-item id='home'>
                 <span class="iconfont icon-shouye" :class="{myColor}"></span>首页
              </mt-tab-item>
              <mt-tab-item id='center'>
                  <span class='iconfont icon-mine-red' :class="{myColor0}">
                  </span>我的
               </mt-tab-item>
          </mt-tabbar>
          
      </div>
</template>
<script>
import centers from './child/center.vue'
import myHome from './child/myHome.vue'
export default {
     data(){
         return{ 
             checked:'home',
             myColor:true,
             myColor0:false
          }
     },
     components:{
         centers,
         myHome
     },
     methods:{
    
     },
     watch:{
         checked(){
             this.checked=='home'?this.myColor=true:this.myColor=false
             this.checked=='center'?this.myColor0=true:this.myColor0=false;
         }
     }
}
</script>
<style scoped>
    .myColor,.myColor0{
        color: red;
    }
    .one{
       margin-top: 40px;
    }
</style>



