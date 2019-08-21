const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

app.use(bodyParser())
app.use(cors())

app.use(async(ctx) => {
    if (ctx.method === 'GET') {
        if(ctx.url == '/login') {
            ctx.body = 'hello'
        }
    } 
    else if (ctx.method === 'POST') {
        console.log(ctx)
    } 
    else {
        ctx.body = '<h2>404</h2>'
    }
})



app.listen(3000);
console.log('server is running')