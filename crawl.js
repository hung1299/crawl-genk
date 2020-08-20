const pupperteer = require('puppeteer');
const cron = require('cron');
require('./config/db');
const Article = require('./model/Article');

const crawl = async () => {
  const browser = await pupperteer.launch();
  const page = await browser.newPage();
  await page.goto('https://genk.vn/tin-ict.chn');

  const data = await page.evaluate(() => {
    let titlesLink = document.querySelectorAll('h4.knswli-title > a');

    titlesLink = [...titlesLink];

    let articles = titlesLink.map((link) => {
      return {
        title: link.getAttribute('title'),
        url: `https://genk.vn${link.getAttribute('href')}`,
      };
    });

    return articles;
  });

  await Promise.all(
    data.map(async (dt) => {
      let article = await Article.findOne({ title: dt.title });

      if (!article) {
        article = new Article({
          title: dt.title,
          url: dt.url,
        });

        await article.save();
      }
    })
  );

  await browser.close();
};

const job = new cron.CronJob({
  cronTime: '0 */2 * * * *',
  onTick: async function () {
    await crawl();
    console.log('Cron job done');
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh',
});

job.start();
