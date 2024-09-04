import React from 'react'
import Search from './Search.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'



const Home = () => {

  const [trendData, setTrendData] = useState({})

  async function getTrends(){

    const options = {
      method: 'GET',
      url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
      params: {
        trend_type: 'MARKET_INDEXES',
        country: 'us',
        language: 'en'
      },
      headers: {
        'x-rapidapi-key': 'c72be7d861mshe83475f9d520233p1f7683jsn6d6544dcf5ee',
        'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTrendData(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    getTrends()
  },[])
  return (
    <div>
      <div className="pt-5">
        <div className="bg-blue-500 p-5  shadow-md">
        <h1 className='text-white font-thin text-center text-4xl'>Stock Plus</h1>
        </div>
      </div>
      <div className="p-5 flex justify-center items-center">
        <Search/>
      </div>
      <h1 className='p-3 bg-blue-500 w-full text-white font-thin text-3xl'>Index Funds</h1>
      <div className="p-3 f mt-5 shadow-md flex justify-center gap-2 flex-wrap">
        {trendData.data && trendData.data.trends ? (<>
        {trendData.data.trends.map((stock,index)=>(
          <div key={index} title={stock.symbol.split(":")[0]} className="shadow-md bg-white w w-1/5 p-3">
            <div className="flex flex-col gap-2">
              <small>{stock.symbol.split(":")[1]}</small>
              <h1>{stock.name}</h1>
            </div>
            <div className="flex f gap-2">
              <strong >${stock.price}<b className={`${String(stock.change).includes("-") ? "text-red-500" : "text-green-500"}`}>{Number(stock.change).toFixed(2)}</b></strong>
              <h3 className={`${String(stock.change_percent).includes("-") ? "text-red-500" : "text-green-500"}`}>%{Number(stock.change_percent).toFixed(2)}</h3>
            </div>
          </div>
        ))}
        </>) : (<p>error</p>)}
        
      </div>
      <h1 className='p-3 bg-blue-500 w-full text-white font-thin mt-5 text-3xl'>Trending News</h1>
      <div className="flex f flex-wrap gap-4 mt-5 justify-center items-center">
        {trendData.data && trendData.data.news ? (<>
        {trendData.data.news.map((story, index)=>(
          <div key={index} className="shadow-md w p-3 w-1/4 rounded-sm">
            <div className="flex flex-col justify-center items-center gap-3">
              <h1 className='font-bold text-2xl'>{story.article_title}</h1>
              <small>{story.source}</small>
            </div>
            <div className="p-2 ">
              {story.article_photo_url && story.article_photo_url.length > 0 ? (<img src={story.article_photo_url} alt="img" />) : (<p>No photo available</p>)}
              <br/>
              <small>{story.post_time_utc}</small>
            </div>
            <div className="">
              <a className='shadow-md text-sm p-2 hover:bg-blue-400 hover:text-white' href={story.article_url}>See Story Here</a>
            </div>

          </div>
        ))}
        </>) : (<p>error</p>)}
        
      </div>
    </div>
  )
}

export default Home
