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
      }else if(type === 'all'){
        const stocks = await getStocks();
        let stockNames = {};
        stocks.map(card => stockNames[`${card.code}`] = card.name);
        result = [{...coinsList, ...stockNames}];
      }
      res.statusCode = 200
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
      name: $(element).find('td:nth-child(1)').html().trim(),
      code: $(element).find('td:nth-child(2)').html().trim(),
      price: $(element).find('td:nth-child(3)').html().trim(),
      variation: $(element).find('td:nth-child(4)').html().trim(),
    };
    data.push(temp);
  });
  return data;
}

async function getCoin(params: string = "USD-BRL"){
  const response = await fetch(`https://economia.awesomeapi.com.br/last/${params}`);
  const data = await response.json();
  var result = [...Object.keys(data)].map((n)=> {
    return {
      name: data[n].name,
      code: data[n].code + " - " + data[n].codein,
      price: `${(parseFloat(data[n].high) + parseFloat(data[n].low)) / 2}`,
      variation: data[n].varBid,
    };
  });
  return result;
}