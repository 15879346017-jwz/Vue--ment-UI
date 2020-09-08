<template>
    <div>
         <mt-navbar v-model='active'>
             <mt-tab-item v-for='(item,index) of categories' :key="index" :id='item.id'>{{item.category_name}}</mt-tab-item>
         </mt-navbar>
         <div class="one">
           <div infinite-scroll-distance="10"
                          v-infinite-scroll="loadMore"
                          infinite-scroll-disabled="busy"
                          :infinite-scroll-immediate-check="true"
                          >
                <!-- 当无限滚动指令绑定到元素之后是否需要立即检测是否执行加载方法-->
                <mt-tab-container v-model='active'>
                    <mt-tab-container-item :id="item.id" v-for="(item,index) of categories" :key="index">
                            <div v-for="(items,i) of datas1" :key="i" >
                                    <div class="one1" @click='drop(items.id)'>
                                        <img v-lazy='items.image' alt="">
                                        <div>
                                            <h3>{{items.subject}}</h3>
                                            <p>{{items.description}}</p>
                                        </div>
                                    </div>
                            </div> 
                  
                       <div class="one2">亲，已经到最后了哦</div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
         </div>
    </div>
</template>
<script>
import loginVue from '../../views/login.vue';
export default {
     data(){
         return{
             active:1,
             categories:[],
             datas1:[],
             busy:false,
             page:1,
             pagecount:0
         }
     },
     methods:{
            drop(val){
               this.$router.push(`/essays?lid=${val}`);    
            },
            loadData(){
                this.$indicator.open('加载中...');
                this.busy=true;
                this.axios.get('/datas1',{params:{cid:this.active,page:this.page}}).then(res=>{
                    let data=res.data.a;
                    this.pagecount=res.data.pagecount;
                    data.forEach(item=>{
                            if(item.image!=null){
                                item.image=require('../../assets/images/articles/'+item.image);
                            }
                            this.datas1.push(item);
                    }); 
                   this.$indicator.close();
                   this.busy=false;
                });
             },
             loadMore(){
                 this.page++;
                 if(this.page<=this.pagecount){
                     this.loadData();
                 }
             }
     },
     watch:{
         active(){
             //清空之前保存的文章数据
            this.datas1=[];
            //获取当前分类的文章第一页的数据
            this.page=1;
            this.loadData();
         }
     },
     mounted(){
        this.axios.get('/categories').then(res=>{
            this.categories=res.data;
        });
          this.loadData();
     }
}
</script>
<style scoped>
     .one{
         margin: 5px 0 40px 0;
     }
     .one1{
         height: 100px;
         margin-top:6px;
     }
     .one1>img{
         float: left;
         width: 95px;
         height: 90px;
     }
     .one1>div{
        float: right;
        width: 70%;
     }
     .one1>div>h3{
         width: 100%;
         height: 20px;
         font-size: 14px;
         font-weight: 700;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
     }
     .one1>div>p{
         width:100%;
         height: 80px;
         font-size: 16px;
         overflow: hidden;
     }
     .one2{
         margin-top:10px;
         font-weight:700;
         font-size:14px;
     }
</style>


