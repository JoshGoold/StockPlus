import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsPage from './NewsPage.jsx';
import FinancialsPage from './FinancialsPage.jsx';

const StockPage = () => {

    const {symbol} = useParams();
    const [data, setData] = useState({})
    const [profileData, setProfileData] = useState({})
    const [newsData, setNewsData] = useState([{}])
    const [financialData, setFinancialData] = useState({})
    const [icon, setIcon] = useState("")
    const [pageNav, setPageNav] = useState({
      stockAnalysis: true,
      financials: false,
      news: false, 
    })

    const nav = useNavigate();

    useEffect(()=>{
        getStats(symbol)
        stockProfile(symbol)
        getNews(symbol)
        getFinancials(symbol)
    },[])

    useEffect(()=>{
        if (profileData.website) {
          getIcon(profileData.website);
        }
    }, [profileData]);

    async function getNews(symbol){
      const options = {
        method: 'GET',
        url: `https://yahoo-finance127.p.rapidapi.com/news/${symbol}`,
        headers: {
          'x-rapidapi-key': '2a5ea49debmsh90928073978c210p19c019jsn79219de4c402',
          'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setNewsData(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    async function getFinancials(symbol){
      const options = {
        method: 'GET',
        url: `https://yahoo-finance127.p.rapidapi.com/finance-analytics/${symbol}`,
        headers: {
          'x-rapidapi-key': '2a5ea49debmsh90928073978c210p19c019jsn79219de4c402',
          'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setFinancialData(response.data)
      } catch (error) {
        console.error(error);
      }
    }


    async function getIcon(website){
      const options = {
        method: 'GET',
        url: 'https://logofinderapi.p.rapidapi.com/',
        params: {
          url: website
        },
        headers: {
          'x-rapidapi-key': '2a5ea49debmsh90928073978c210p19c019jsn79219de4c402',
          'x-rapidapi-host': 'logofinderapi.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setIcon(response.data.imgUrl)
      } catch (error) {
        console.error(error);
      }
    }

    async function getStats(query){

        const options = {
          method: 'GET',
          url: `https://yahoo-finance127.p.rapidapi.com/key-statistics/${query}`,
          headers: {
            'x-rapidapi-key': '2a5ea49debmsh90928073978c210p19c019jsn79219de4c402',
            'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setData(response.data)
        } catch (error) {
          console.error(error);
        }
      }

   
    

    async function stockProfile(symbol){
        const options = {
            method: 'GET',
            url: `https://yahoo-finance127.p.rapidapi.com/asset-profile/${symbol}`,
            headers: {
              'x-rapidapi-key': '2a5ea49debmsh90928073978c210p19c019jsn79219de4c402',
              'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setProfileData(response.data)
          } catch (error) {
              console.error(error);
          }
    }

  return (
    <div className='p-4'>
        <div className="text-2xl m p-10 flex justify-between shadow-md">
            <div className="flex t items-center"><img className='h-16 w-16' alt='Logo' src={icon || "N/A"}></img> &nbsp; <h1>{symbol} | {data.displayName}</h1></div>
            <div className="flex pt-3 n gap-2">
            <button className='text-sm p rounded-sm hover:scale-105 shadow-md' onClick={()=> nav("/")}>Home</button>
            <button onClick={()=>setPageNav({stockAnalysis: true, financials: false, news: false})} className={`${pageNav.stockAnalysis === true ? "bg-blue-500 text-white" : ""} rounded-sm text-sm p  hover:scale-105 shadow-md`} >Stock Analysis</button>
            <button onClick={()=>setPageNav({stockAnalysis: false, financials: true, news: false})} className={`${pageNav.financials === true ? "bg-blue-500 text-white" : ""} rounded-sm text-sm p  hover:scale-105 shadow-md`} >Financials</button>
            <button onClick={()=>setPageNav({stockAnalysis: false, financials: false, news: true})} className={`${pageNav.news === true ? "bg-blue-500 text-white" : ""} rounded-sm text-sm p  hover:scale-105 shadow-md`} >News</button>
            </div>
        </div> 
        {/* Company Metrics */}
        {pageNav.stockAnalysis === true && (
          <div className="">
        <div className="pt-5">
        <h1 className='text-2xl w-full shadow-md bg-blue-400 text-white p-2 font-thin'>Key Metrics</h1>
        <ul className='flex metrics pt-2 flex-wrap gap-3'>
        <li>50 Day Average:<br/> ${data.fiftyDayAverage?.fmt || "N/A"}</li>
        <li>50 Day Average Change:<br/> ${data.fiftyDayAverageChange?.fmt || "N/A"}</li>
        <li>50 Day Average Change %:<br/> {data.fiftyDayAverageChangePercent?.fmt || "N/A"}</li>
        <li>52 Week Change %:<br/> {data.fiftyTwoWeekChangePercent?.fmt || "N/A"}</li>
        <li>52 Week High:<br/> ${data.fiftyTwoWeekHigh?.fmt || "N/A"}</li>
        <li>52 Week High Change:<br/> ${data.fiftyTwoWeekHighChange?.fmt || "N/A"}</li>
        <li>52 Week High Change %:<br/> {data.fiftyTwoWeekHighChangePercent?.fmt || "N/A"}</li>
        <li>52 Week Low:<br/> ${data.fiftyTwoWeekLow?.fmt || "N/A"}</li>
        <li>52 Week Low Change:<br/> ${data.fiftyTwoWeekLowChange?.fmt || "N/A"}</li>
        <li>52 Week Low Change %:<br/> {data.fiftyTwoWeekLowChangePercent?.fmt || "N/A"}</li>
        <li>52 Week Range:<br/> ${data.fiftyTwoWeekRange?.fmt || "N/A"}</li>
        <li>Dividend Date:<br/> {data.dividendDate?.fmt || "N/A"}</li>
        <li>EPS Current Year:<br/> ${data.epsCurrentYear?.fmt || "N/A"}</li>
        <li>EPS Forward:<br/> ${data.epsForward?.fmt || "N/A"}</li>
        <li>EPS Trailing 12 Months:<br/> ${data.epsTrailingTwelveMonths?.fmt || "N/A"}</li>
        <li>Price EPS Current Year:<br/> ${data.priceEpsCurrentYear?.fmt || "N/A"}</li>
        <li>Forward PE:<br/> ${data.forwardPE?.fmt || "N/A"}</li>
        <li>Expected IPO Date:<br/> {data.ipoExpectedDate?.fmt || "N/A"}</li>
        <li>Trailing Annual Dividend Rate:<br/> {data.trailingAnnualDividendRate?.fmt || "N/A"}</li>
        <li>Trailing Annual Dividend Yield:<br/> ${data.trailingAnnualDividendYield?.fmt || "N/A"}</li>
        <li>200 Day Average:<br/> ${data.twoHundredDayAverage?.fmt || "N/A"}</li>
        <li>200 Day Change:<br/> ${data.twoHundredDayAverageChange?.fmt || "N/A"}</li>
        <li>200 Day Change %:<br/> {data.twoHundredDayAverageChangePercent?.fmt || "N/A"}</li> 
      </ul>
      </div>
      <div className="pt-5">
      <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Key Ratings</h1>
      <ul className='flex metrics flex-wrap gap-3'>
        <li>Average Analyst Rating:<br/> {data.averageAnalystRating || "N/A"}</li>
        <li>Outstanding Shares:<br/> {data.sharesOutstanding?.fmt || "N/A"}</li>
        <li>Market Cap:<br/> ${data.marketCap?.fmt || "N/A"}</li>
        <li>Bid:<br/> ${data.bid?.fmt || "N/A"}</li>
        <li>Book Value:<br/> ${data.bookValue?.fmt || "N/A"}</li>
        <li>Price Alert Confidence:<br/> {data.customPriceAlertConfidence || "N/A"}</li>
    </ul>
    </div>
    <div className="pt-5">
    <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Exchange Metrics</h1>
      <ul className='flex metrics flex-wrap gap-3'>
        <li>Currency:<br/> {data.currency || "N/A"}</li>
        <li>Timezone:<br/> {data.exchangeTimezoneName || "N/A"} - {data.exchangeTimezoneShortName || "N/A"}</li>
        <li>Exchange:<br/> {data.exchange || "N/A"} - {data.fullExchangeName || "N/A"}</li>
        <li>Source:<br/> {data.quoteSourceName || "N/A"}</li>
        <li>Market:<br/> {data.market || "N/A"}</li>
        <li>Stock Type:<br/> {data.typeDisp || "N/A"}</li>
      </ul>
      </div>
      <div className="pt-5">
      <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Daily Metrics</h1>
      <ul className='flex metrics flex-wrap gap-3'>
      <li>Post Market Price:<br/> ${data.postMarketPrice?.fmt || "N/A"}</li>
        <li>Post Market Change:<br/> ${data.postMarketChange?.fmt || "N/A"} - {data.postMarketChangePercent?.fmt || "N/A"}</li>
        <li>Avg. Daily Volume (3 Months):<br/> {data.averageDailyVolume3Month?.fmt || "N/A"}</li>
        <li>Avg. Daily Volume (10 Days):<br/> {data.averageDailyVolume10Day?.fmt || "N/A"}</li>
        <li>Regular Market Change:<br/> ${data.regularMarketChange?.fmt || "N/A"}</li>
        <li>Regular Market Change %:<br/> {data.regularMarketChangePercent?.fmt || "N/A"}</li>
        <li>Regular Market Day High:<br/> ${data.regularMarketDayHigh?.fmt || "N/A"}</li>
        <li>Regular Market Day Low:<br/> ${data.regularMarketDayLow?.fmt || "N/A"}</li>
        <li>Regular Market Day Range:<br/> ${data.regularMarketDayRange?.fmt || "N/A"}</li>
        <li>Regular Market Open:<br/> ${data.regularMarketOpen?.fmt || "N/A"}</li>
        <li>Regular Market Close:<br/> ${data.regularMarketClose?.fmt || "N/A"}</li>
        <li>Regular Market Price:<br/> ${data.regularMarketPrice?.fmt || "N/A"}</li>
        <li>Regular Market Volume:<br/> {data.regularMarketVolume?.fmt || "N/A"}</li>
      </ul>
    </div>
      {/* Company Profile */}
      <div className="pt-5">
      <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Business Profile</h1>
      <ul className='flex metrics flex-wrap gap-3'>
        <li><b>Business Summary:</b> <br/>{profileData.longBusinessSummary || "N/A"}</li>
      </ul>
      </div>
      <div className="pt-5">
      <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Business Location</h1>
      <ul className='flex metrics flex-wrap gap-3'>
        <li>Address: {profileData.address1 || "N/A"}</li>
        <li>City: {profileData.city || "N/A"}</li>
        <li>State: {profileData.state || "N/A"}</li>
        <li>Zip: {profileData.zip || "N/A"}</li>
        <li>Country: {profileData.country || "N/A"}</li>
        </ul>
        </div>
        <div className="pt-5">
        <h1 className='text-2xl w-full bg-blue-400 text-white p-2 font-thin'>Extra Info</h1>
        <ul className='flex metrics flex-wrap gap-3'>
        <li>Phone: {profileData.phone || "N/A"}</li>
        <li>Website: <a className='shadow-md p-2' href={profileData.website || "N/A"}>Click here</a></li>
        <li>Industry: {profileData.industry || "N/A"}</li>
        <li>Sector: {profileData.sector || "N/A"}</li>
        <li>Full-Time Employees: {profileData.fullTimeEmployees || "N/A"}</li>
      </ul>
      </div>
      </div>)}

      {pageNav.financials === true && (
        <FinancialsPage data={financialData}/>
      )}
      {pageNav.news === true && (
        <NewsPage data={newsData}/>
      )}
      
    </div>
    
  )
}

export default StockPage
