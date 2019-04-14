const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./src/index');

const app = new Koa();
const PORT = process.argv[3] || 3001;

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}\n`);
});
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(
	cors({
		origin: '*',
		allowHeaders: 'X-Requested-With, Content-Type, Origin',
		credentials: true
	})
);
app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;