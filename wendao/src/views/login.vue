<template>
    <div>
        <mt-header title="问道登录">
            <router-link to="/" slot="left">
               <mt-button icon="back" size="small"></mt-button>
            </router-link>
        </mt-header>
        <div>
             <mt-field type='text' label="账号" placeholder="请输入账号" v-model="uname" disableClear :state="isState" @blur.native.capture="check(uname,1)"></mt-field>
              <mt-field type='password' label="密码" placeholder="请输入密码" v-model="pwd" disableClear :state="isState0" @blur.native.capture="check(pwd,0)"></mt-field>
              <mt-button size="large" :disabled="bools" type='primary' @click='login'>登录</mt-button>
              <router-link to='/reg'>
              <mt-button size='large' type='default'>没有账号？前往注册</mt-button>
              </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            uname:'',
            pwd:'',
            isState:'',
            isState0:'',
            bools:true,
        }
    },
    methods:{
         check(val,index){
             var checktext=/^[0-9a-zA-Z]\d{6,16}$/;
             if(index=="1"){
                 if(checktext.test(val)){this.isState="success"}
                 else{this.$toast({
                     message:'您输入的账号格式不正确，请输入8~16位数字，大小写英文字母混合',
                     position:'middle',
                     duration:3000
                      });
                      this.isState='error';
                 }
                 }else{
                      if(checktext.test(val)){this.isState0="success"}
                     else{this.$toast({
                     message:'您输入的密码格式不正确，请输入8~16位数字，大小写英文字母混合',
                     position:'middle',
                     duration:3000
                      });
                      this.isState0='error';
                 }
                 }

                 if(this.isState0=="success" && this.isState=="success"){
                        this.bools=false
                 }
             },
             login(){
                  this.axios.get('/login',{params:{uname:this.uname,pwd:this.pwd}}).then(res=>{
                            let _id=res.data;
                            let id;
                            if(_id==0){
                                this.$messagebox('账号或密码输入错误,登录失败')
                            }else{
                                console.log(_id[0].id);
                                sessionStorage.setItem('_id',_id[0].nickname);
                                sessionStorage.setItem('id',_id[0].id);
                                this.$messagebox('登录成功,欢迎你我的朋友');
                                this.$router.push('/');
                            }
                  })
             }
         }
    }

</script>

