import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [query, setQuery] = useState("")
    const [queryData, setQueryData] = useState([])
    const [hover, setHover] = useState({state: false, cur: ""})
    const nav = useNavigate();

    window.addEventListener("keypress", (e)=>{
      const code = "Enter"
      if(e.key === code && query.length > 0){
        SearchQuery(query)
        setQuery("")
      }
    })

    async function SearchQuery(query){

      const options = {
        method: 'GET',
        url: `https://yahoo-finance127.p.rapidapi.com/search/${query}`,
        headers: {
          'x-rapidapi-key': 'c72be7d861mshe83475f9d520233p1f7683jsn6d6544dcf5ee',
          'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setQueryData(response.data.quotes)
      } catch (error) {
        console.error(error);
        return error.message
      }
      
      }

  return (
    <div className="">
    <div>
      <input id='search' className='p-3 text-2xl rounded-md shadow-md border-black hover:border-blue-400 text-black' value={query} type='text' onChange={(e)=> setQuery(e.target.value)} placeholder='Search Stocks'></input>
      <button className='text-2xl hover:scale-105' onClick={()=>{
        SearchQuery(query)
        setQuery("")
        }}>🔍</button>
    </div>
    <div className="mt-5">
      <ul className='flex fr gap-4'>
      {queryData.map((stock, index)=>(
        <div className="">
        {stock.exchange !== "OPR" && (
          <>
          <li onClick={()=>nav(`/stocks/${stock.symbol}`)} onMouseOut={()=> setHover({state: false, cur: ""})} onMouseOver={()=> setHover({state: true, cur: stock.shortname})} className='relative shadow-black hover:scale-105 shadow-sm flex justify-center items-center p-10' key={index}>{stock.shortname}</li>
          {hover.state === true && hover.cur === stock.shortname && (
                <ul className='flex flex-col'>
                  <li>Symbol: {stock.symbol}</li>
                  <li>Exchange: {stock.exchDisp}</li>
                  <li>{stock.industry ? `Industry: ${stock.industry}` : ""}</li>
                  <li>{stock.sector ? `Sector: ${stock.sector}` : ""}</li>
                </ul>
            )}
          </>
        )}
        </div>
      ))}
      </ul>
    </div>
    </div>
  )
}



export default Search
