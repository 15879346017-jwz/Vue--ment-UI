<template>
      <div>
          <mt-header title='问道注册'>
               <router-link slot="left" to="/">
                 <mt-button icon='back' size='small'></mt-button>
               </router-link>
          </mt-header>
          <div>
               <mt-field type="text" label="账号" placeholder="请输入账号" disableClear v-model="uname" :state="isState0" @blur.native.capture="check(uname,0)"></mt-field>
               <mt-field type="password" label="密码" placeholder="请输入密码" disableClear v-model='pwd' :state="isState1" @blur.native.capture="check(pwd,1)"></mt-field>
               <mt-field type="password" label="确认密码" placeholder="请再次输入密码" disableClear v-model='pwd1' :state="isState2" @blur.native.capture="check3"></mt-field>
               <mt-field type="text" label="笔名" placeholder="请输入笔名" disableClear v-model='Pname' :state="isState3" @blur.native.capture="check4"></mt-field>

             <mt-button type="primary" size='large' :disabled="bools" @click="reg">注册</mt-button>
          </div>
      </div>
</template>
<script>
export default {
    data(){
      return {
          uname:'',
          pwd:'',
          pwd1:'',
          isState0:'1',
          isState1:'1',
          isState2:'1',
          bools:true,
          Pname:'',
          isState3:'1',
          datas:''
      }
    },
    methods:{
          check(val,index){
             var checktext=/^[0-9a-zA-Z]\d{8,16}$/;
             if(index==0){
             if(checktext.test(val)){
                 this.isState0="success" 
             }else{
               this.$toast({
                 message:'请输入8~16位数字，大小写英文字母混合',
                 position:'middle',
                 duration:3000
               });
               this.isState0="error"
               return;
             }
             }else{
               if(checktext.test(val)){
                 this.isState1="success" 
             }else{
               this.$toast({
                 message:'请输入8~16位数字，大小写英文字母混合',
                 position:'middle',
                 duration:3000
               });
               this.isState1="error";
               this.pwd="";
               return;
             }
             }
          },
         check3(){
           if(this.pwd!==this.pwd1){
             this.$messagebox('密码与确认密码不一致')
             this.isState2='error';
             this.pwd1='';
             return;
           }else{
             this.isState2='success';
           };
             if(this.isState0=='success' && this.isState1=='success' && this.isState2=='success'){
             this.bools=false;
           }
         },
         check4(){

         },
         reg(){
            this.axios.post('/reg',`username=${this.uname}&password=${this.pwd}&nickname=${this.Pname}`).then(res=>{
              this.datas=res.data;
              if(this.datas==0){
                this.$messagebox('注册失败');
              }else{
                this.$messagebox('注册成功');
                this.$router.push('/login');
              }
            })
         }
    }
}
</script>
<style scoped>
     
</style>

