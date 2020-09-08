<template>
     <div>
         <mt-header title="问道" fixed v-if="bools==true">
               <router-link to="/login" slot="right">
                   <mt-button type='primary' size='small'>登录</mt-button>
                </router-link>
                <router-link to="/reg" slot="right">
                   <mt-button type='primary' size='small'>注册</mt-button>
                </router-link>
         </mt-header>
         <mt-header title="问道" fixed v-else>
            <router-link slot="right" to=''>
                 <mt-button type='primary' size='small' @click='leave'>退出登录</mt-button>
            </router-link>
         </mt-header>

     </div>
</template>
<script>
export default {
    data(){
        return {
            logindata:'',
            mydata:'',
            bools:true
                }
    },
    methods:{
          leave(){
              sessionStorage.clear();
              this.bools=true;
          }
    },
    mounted(){
         this.logindata=sessionStorage.getItem('_id');
         if(this.logindata!=null){
             this.bools=false;
         }
    }
}
</script>
<style scoped>
     a{
         text-decoration: none;
     }
</style>


