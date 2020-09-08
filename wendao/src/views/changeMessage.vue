<template>
    <div>
       <mt-header title="信息修改">
          <router-link slot="left" to="/">
              <mt-button type='primary' icon="back" size="small"></mt-button>
          </router-link>
       </mt-header>
       <div>
             <mt-field type='text' label="账号" placeholder="请输入账号" v-model="uname" disableClear></mt-field>
             <mt-field type='text' label="密码" placeholder="请输入密码" v-model="pwd" disableClear></mt-field>
             <mt-field type='text' label="笔名" placeholder="请输入笔名" v-model="nickname" disableClear></mt-field>
             <mt-field type='file' label="头像" v-model='avatar' disableClear></mt-field>
             <button class="btn" @click='changemessage'>修改</button>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return{uname:'',pwd:'',nickname:'',avatar:'',avatars:'',id:''}
    },
    methods:{
           changemessage(){
               var i=this.avatar.lastIndexOf('\\');
               this.avatars=this.avatar.slice(i+1);
               this.axios.put('/changemessage',`id=${this.id}&username=${this.uname}&password=${this.pwd}&nickname=${this.nickname}&avatar=${this.avatars}`).then(res=>{
                   let a=res.data;
                   a==0?this.$messagebox('修改失败'):this.$messagebox('修改成功');
                   this.$router.push('/');
               })
           }
    },
    mounted(){
        this.id=sessionStorage.getItem('id');
        this.axios.get('/center',{params:{lid:this.id}}).then(res=>{
            let datas=res.data;
            this.uname=datas[0].username;
            this.pwd=datas[0].password;
            this.nickname=datas[0].nickname;
        })
    }
}
</script>
<style>
    .btn{
        width:100%;
        background-color: #26A2FF;
        color: #ffffff;
        height: 45px;
        font-size: 16px;
        outline: none;
        border: 0;
    }
</style>