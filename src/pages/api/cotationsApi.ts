import type { NextApiRequest, NextApiResponse } from 'next'


const cheerio = require('cheerio');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const type = req.query.type
    try{
      let result = [];
      if(type === 'coin'){
        result = await getMoeda();
      }else if(type === 'stocks'){
        result = await getStocks();
      }
      res.statusCode = 200
      return res.json({
        data: result
      })
    } catch (e) {
      res.statusCode = 404
      return res.json({
        error: 'not found.',
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

async function getMoeda(){
  const response = await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL,XRP-BRL`);
  const data = await response.json();
  return data;
}