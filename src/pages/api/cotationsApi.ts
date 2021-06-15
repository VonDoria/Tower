import type { NextApiRequest, NextApiResponse } from 'next'
import coinsList from '../../../public/coinsList.json'


const cheerio = require('cheerio');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const type = req.query.type
    try{
      let result = [];
      if(type === 'coin'){
        result = await getCoin();
      }else if(type === 'stocks'){
        result = await getStocks();
      }else if(type === 'list'){
        var stocks = await getStocks();
        var coin = await getCoin();
        result = [...stocks, ...coin];
      }
      res.statusCode = 200
      console.log(result);
      return res.json({
        data: result
      })
    } catch (e) {
      res.statusCode = 404
      return res.json({
        error: 'not found.',
        message: e
      })
    }
  }
}

async function getStocks(){
  const response = await fetch(`https://valorinveste.globo.com/cotacoes/`);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString, null, false);
  const data = [];
  $('.vd-table__body tr').each((index: number, element: HTMLElement) => {
    let temp = {
      name: $(element).find('td:nth-child(1)').html(),
      code: $(element).find('td:nth-child(2)').html(),
      price: $(element).find('td:nth-child(3)').html(),
      variation: $(element).find('td:nth-child(4)').html(),
    };
    data.push(temp);
  });
  return data;
}

async function getCoin(){
  const response = await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`);
  const data = await response.json();
  var result = data.map(c => {
    return {
      name: c.name,
      code: c.code + " - " + c.codein,
      price: `${(parseFloat(c.high) + parseFloat(c.low)) / 2}`,
      variation: c.varBid,
    };
  });
  return result;
}