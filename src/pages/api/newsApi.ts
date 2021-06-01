import type { NextApiRequest, NextApiResponse } from 'next'


// npm install newsapi --save
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e29c2871949345f3bfa6ea31f773d6cf');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET')
  {
    try{
      let q = req.query.q
      let category = req.query.category
      let language = req.query.language
      let country = req.query.country
      console.log(q);
      console.log(category);
      console.log(language);
      console.log(country);
      newsapi.v2.topHeadlines({
        q: q,
        category: category,
        language: language,
        country: country
      }).then(response => {
        res.statusCode = 200
        return res.json({
          news: response,
        });
      });
    }catch (e) {
      res.statusCode = 404
      return res.json({
        error: 'not found.',
      });
    }
  }
}


  