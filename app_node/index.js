const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const router = require('koa-router')()
const axios = require('axios')
const md5 = require('js-md5')


axios.defaults.baseURL = 'http://hd215.api.yesapi.cn'; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

const appKey = '8BCC051034B77818A7732EBF575F1DC2';
const appSecret = 'tgqc4x53kxCm88SoMCsDYxJWngET4HTOLZO9QW9fpTuvrCvVIJQB0ckTyr'

app.use(bodyParser())
app.use(cors())


// 生成签名函数
async function getSign(val) {
    let str = '';
    str += appKey;
    // for (let key of Object.keys(val).sort()) {
    //     console.log(key, val[key]);
    //     str += val[key]
    // }
    str += val.s;
    str += appSecret;
    console.log(str)
    str = (md5(str)).toUpperCase();
    return str;
}


// 登录接口
router.post('/login',async(ctx,next) => {
    let val =  ctx.request.body;


    const login = async(data) => {
        return new Promise((resolve,reject)=> {
            // axios.get('/?s='+data.s+'&username='+data.username+'&password='+data.password+'&app_key='+appKey)
            axios.post('/?s='+data.s+'&app_key='+appKey,{
                username: data.username,
                password: data.password,
            })
            .then(res => {
                // console.log(res)
                resolve(res.data)
            })
            .catch(res => {
                resolve(res.data)
            })
        })
    }
    // let sign = await getSign(val);
    let result = await login(val);
    await next();
    ctx.body = result.data;
})


// 注册接口
router.post('/register',async(ctx,next) =>{
    let val =  ctx.request.body;
    const register = async(data) => {
        return new Promise((resolve,reject)=> {
            // axios.get('/?s='+data.s+'&username='+data.username+'&password='+data.password+'&ext_info='+data.ext_info+'&app_key='+appKey)
            axios.post('/?s='+data.s+'&app_key='+appKey,{
                username: data.username,
                password: data.password,
                ext_info: data.ext_info
            })
            .then(res => {
                // console.log(res)
                resolve(res.data)
            })
            .catch(res => {
                resolve(res.data)
            })
        })
    }

    let result = await register(val);
    await next();
    ctx.body = result.data;
})

// 修改密码
router.post('/changePassword',async(ctx,next) =>{
    let val =  ctx.request.body;
    const register = async(data) => {
        return new Promise((resolve,reject)=> {
            // axios.get('/?s='+data.s+'&username='+data.username+'&password='+data.password+'&ext_info='+data.ext_info+'&app_key='+appKey)
            axios.post('/?s='+data.s+'&app_key='+appKey,{
                username: data.username,
                old_password: data.old_password,
                new_password: data.new_password
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(res => {
                resolve(res.data)
            })
        })
    }

    let result = await register(val);
    await next();
    ctx.body = result.data;
})

router.get('/exit',async(ctx) => {
    ctx.body = 'exit'
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('server is running')