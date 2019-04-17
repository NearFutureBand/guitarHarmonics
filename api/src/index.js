/* eslint-disable no-console */
const Router = require('koa-router');
const _ = require('lodash');
const TUNINGS = require('./tunings.json');

const router = new Router();
const { createFretMatrix, findHarmonic } = require('./functions');

const handleError = (err, ctx) => {
  console.log(err.details);
  ctx.body = err.details;
};

router.get('/', async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = 'Awesome, the server works okay!';
  } catch (err) {
    ctx.body = new Error(`It seems like the server doesn't work: ${err.details.toString()}`);
  }
});

router.get('/vitrual/api/v1/fretboard/:tuning/:strings/:frets', async (ctx) => {
  try {
    ctx.body = createFretMatrix(ctx.params);
  } catch (err) {
    handleError(err, ctx);
  }
});

router.get('/virtual/api/v1/harmonic/:root/:scale', async (ctx) => {
  try {
    ctx.body = findHarmonic(ctx.params);
  } catch (err) {
    handleError(err, ctx);
  }
});

router.get('/virtual/api/v1/available-tunings', async (ctx) => {
  try {
    ctx.body = TUNINGS;
  } catch (err) {
    handleError(err, ctx);
  }
});

module.exports = router;
