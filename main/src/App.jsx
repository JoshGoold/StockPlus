import Home from './components/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockPage from './components/StockPage.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home/>}/>
    <Route path='/stocks/:symbol' element={<StockPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
