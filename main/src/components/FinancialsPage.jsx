import React from 'react'

const FinancialsPage = (props) => {
  return (
    <div>
        <div className="">
        <h1 className='text-2xl w-full shadow-md bg-blue-400 text-white p-2 font-thin'>Analyst Ratings</h1>
      <ul className='flex metrics pt-2 flex-wrap gap-3'>
        <li>Current Share Price: ${props.data.currentPrice?.fmt || "N/A"}</li>
        <li>Target High Price: ${props.data.targetHighPrice?.fmt || "N/A"}</li>
        <li>Target Low Price: ${props.data.targetLowPrice?.fmt || "N/A"}</li>
        <li>Target Mean Price: ${props.data.targetMeanPrice?.fmt || "N/A"}</li>
        <li>Target Median Price: ${props.data.targetMedianPrice?.fmt || "N/A"}</li>
        <li>Analyst Recommendation: {props.data.recommendationMean?.raw} - {props.data.recommendationKey || "N/A"}</li>
        <li>Number of Analyst Opinions: {props.data.numberOfAnalystOpinions?.fmt || "N/A"}</li>
        </ul>
        </div>

        <div className="">
        <h1 className='text-2xl w-full shadow-md bg-blue-400 text-white p-2 font-thin'>Company Fundamentals</h1>
        
        <ul className='flex metrics pt-2 flex-wrap gap-3'>
        <li>Total Cash: ${props.data.totalCash?.fmt || "N/A"}</li>
        <li>Total Cash per share: ${props.data.totalCashPerShare?.fmt || "N/A"}</li>
        <li>Total Debt: ${props.data.totalDebt?.fmt  || "N/A"}</li>
        <li>Total Revenue: ${props.data.totalRevenue?.fmt || "N/A"}</li>
        <li>Revenue per share: ${props.data.revenuePerShare?.fmt || "N/A"}</li>
        <li>Return on Assets: ${props.data.returnOnAssets?.fmt || "N/A"}</li>
        <li>Return on Equity: {props.data.returnOnEquity?.fmt || "N/A"}</li>
        <li>Gross Profits: ${props.data.grossProfits?.fmt || "N/A"}</li>
        <li>Free Cash Flow: ${props.data.freeCashFlow?.fmt || "N/A"}</li>
        <li>Operating Cash Flow: ${props.data.operatingCashFlow?.fmt || "N/A"}</li>
        <li>Earnings Growth: {props.data.earningsGrowth?.fmt || "N/A"}</li>
        <li>Revenue Growth: {props.data.revenueGrowth?.fmt || "N/A"}</li>
        <li>Gross Margins: {props.data.grossMargins?.fmt || "N/A"}</li>
        <li>Operating Margins: {props.data.operatingMargins?.fmt || "N/A"}</li>
        <li>Profit Margins: {props.data.profitMargins?.fmt || "N/A"}</li>
        <li>E.B.I.T.D.A Margins: {props.data.ebitdaMargins?.fmt}</li>
        <li>E.B.I.T.D.A: ${props.data.ebitda?.fmt || "N/A"}</li>
        <li>Quick Ratio: {props.data.quickRatio?.fmt}</li>
        <li>Current Ratio: {props.data.currentRatio?.fmt || "N/A"}</li>
        <li>Debt to Equity: {props.data.debtToEquity?.fmt || "N/A"}</li>
        </ul>
        </div>

    </div>
  )
}

export default FinancialsPage
