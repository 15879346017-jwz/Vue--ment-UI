<template>
    <div>
         <mt-header title="问道文章" fixed>
              <router-link slot="left" to="/">
                 <mt-button icon="back" type="primary" sixe="small"></mt-button>
              </router-link>
         </mt-header>
         <div class="contents">
             <h3>{{a}}</h3>
             <div v-html="c"></div>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{datas:[],a:'',b:'',c:''}
    },
    beforeCreate() {
        let lid =Number(this.$route.query.lid);
        this.axios.get('/essay',{params:{id:lid}}).then(res=>{
             this.datas=res.data;
             this.a=this.datas[0].subject;
             this.b=this.datas[0].description;
             this.c=this.datas[0].content
         })

    },
}
</script>
<style>
.contents{
   margin-top:50px;
      }
.contents>h3{
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
      }
.contents>div p,.contents>div li{  
  padding:10px;
  font-size: 20px;
  line-height: 1.8em;
  list-style: none;
}
.contents>div img{
   max-width: 100%;
  }
</style>



