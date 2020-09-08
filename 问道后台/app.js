//加载express模块
const express=require('express');
//加载cors模块
const cors=require('cors');
//创建服务器
const server=express();
//获取所有文章分类的接口

const bodyParser=require('body-parser');

//加载mysql模式
const mysql=require('mysql');
const { resolveAny } = require('dns');

//创建mysql连接池
const pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'xzqa',
    connectionLimit:20
})

//使用cros模块
server.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8080']
}))

//使用bodyParser模块
server.use(bodyParser.urlencoded({
    extended:false
}));


server.get('/categories',(req,res)=>{
    let sql="select id,category_name from xzqa_category"
    pool.query(sql,(err,a)=>{
        if(err)throw err;
        res.send(a);
    })
})


server.get(`/datas1`,(req,res)=>{
     let _id=req.query.cid;
     let page=parseInt(req.query.page);
     let pagesize=15;
     let offset=(page-1)*pagesize;
    let sql=`select id,subject,description,image from xzqa_article where category_id=? limit ${offset},${pagesize}`;
    pool.query(sql,[_id],(err,a)=>{
        if(err)throw err;
        sql=`select count(id) as count from xzqa_article where category_id=?`;
        pool.query(sql,[_id],(err,s)=>{
            if(err)throw err;
            let count=s[0].count;
            let pagecount=Math.ceil(count/pagesize);
            res.send({a:a,pagecount:pagecount});
        })
    })
});

// server.get('/datas2',(req,res)=>{
//     var arr=[];
//     let sql="select id,subject,description,image from xzqa_article where subject like '%交互%'";
//     pool.query(sql,(err,a)=>{
//         if(err)throw err;
//         arr=a;
//         res.send(a);
//     })
// });

// server.get('/datas3',(req,res)=>{
//     let sql="select id,subject,description,image from xzqa_article where subject like '%电商%'";
//     pool.query(sql,(err,a)=>{
//         if(err)throw err;
//         res.send(a);
//     })
// });

// server.get('/datas4',(req,res)=>{
//     let sql="select id,subject,description,image from xzqa_article where subject like '%网页%'";
//     pool.query(sql,(err,a)=>{
//         if(err)throw err;
//         res.send(a);
//     })
// });

server.get('/essay',(req,res)=>{
    let lid=req.query.id;
    let sql="select description,subject,content from xzqa_article where id=?";
    pool.query(sql,[lid],(err,a)=>{
          if(err) throw err;
          res.send(a);
    })
});

server.get('/login',(req,res)=>{
    let _uname=req.query.uname;
    let _pwd=req.query.pwd;
    let sql='select id,nickname from xzqa_author where username=? and password=?';
    pool.query(sql,[_uname,_pwd],(err,a)=>{
        if(err) throw err;
        if(a.length==0){
            res.send("0")
        }else{
            res.send(a)
        }
    })
})




server.post('/reg',(req,res)=>{
    let obj=req.body;
    let sql='insert into xzqa_author set ?';
    pool.query(sql,[obj],(err,a)=>{
        if(err) throw err;
        if(a.length==0){
            res.send('0')
        }else{
            res.send('1')
        }
    })
});

server.get('/center',(req,res)=>{
    let lid=req.query.lid;
    let sql='select nickname,avatar,username,password from xzqa_author where id=?';
    pool.query(sql,[lid],(err,a)=>{
        if(err)throw err;
        res.send(a);
    })
})

server.put('/changemessage',(req,res)=>{
    let obj=req.body;
    let id=req.body.id;
    let sql="update xzqa_author set ? where id=?";
    pool.query(sql,[obj,id],(err,a)=>{
        if(err)throw err;
        if(a.affectedRows==0){
            res.send('0')
        }else{
            res.send('1')
        }
    })
})

//创建服务器监听端口
server.listen(3000,()=>{
    console.log('服务器启动...');
})



