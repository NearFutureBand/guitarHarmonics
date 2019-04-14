const Router = require('koa-router');
const router = new Router();
const { createFretMatrix } = require('./functions');

const handleError = (err, ctx) => {
  console.log(err.details);
  ctx.body = err.details;
}

router.get('/', async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = 'Awesome, the server works okay!';
  } catch(err) {
    ctx.body = new Error(`It seems like the server doesn't work: ${err.details.toString()}`);
  }
});

router.get('/vitrual/api/v2/fretboard/:tuning/:strings/:frets', async(ctx) => {
  try {
    ctx.body = createFretMatrix(ctx.params);
  } catch(err) {
    handleError(err, ctx);
  }
});

module.exports = router;