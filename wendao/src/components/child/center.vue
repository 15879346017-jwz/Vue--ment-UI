<template>
    <div>
         <div class="one">
            <table></table>
             <div class="one-1"><img :src="images" alt=""></div>
             <span>hello,<i>{{nicknames}}</i></span>
         </div>
         <div class="two" @click='change'>修改个人信息 <span>></span></div>
        <!-- <button class="three" @click='leaves'>退出登录</button>-->
    </div>
</template>
<script>
export default {
      data(){
          return{datas:[],images:'',nicknames:'friend',lid:''}
      },
      methods:{
             change(){
                 this.$router.push('/changemessage');
                 if(this.lid==null){
                     this.$router.push('/login');
                 }
             }
      },
      mounted(){
         this.lid=sessionStorage.getItem('id');
          this.axios.get('/center',{params:{lid:this.lid}}).then(res=>{
               this.datas=res.data;
             this.lid==null?this.images=require('../../assets/images/avatar/17.jpg'):this.images=require('../../assets/images/avatar/'+this.datas[0].avatar);
             this.lid==null?this.nicknames='friend':this.nicknames=this.datas[0].nickname;
            
          })
      }
}
</script>
<style scoped>
     .one{
         width:100%;
         height: 150px;
     }
     .one-1{
         width:70px;
         height: 70px;
        background-color: #26A2FF;
        margin: 25px auto 0 auto;
        border-radius: 35px;
        overflow: hidden;
     }
     .one>span{
         display: block;
         width: 100%;
         height: 30px;
         font-size: 20px;
         line-height: 30px;
     }
     .one>i{
        font-weight: 700;
     }
    .two,.three{
        box-sizing: border-box;
        width:100%;
        height: 45px;
        font-size:20px;
        color: #FFFFFF;
        text-align: center;
        line-height: 45px;
        background-color: #26A2FF;
        border-radius: 6px;
    }
    .three{
        outline: none;
        border: 0;
    }
    .two>span{
        float: right;
        padding-right: 5px;
    }
</style>

