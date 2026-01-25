import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Breaf from './pages/breaf/Breaf'

function App() {


  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/breaf' element={<Breaf />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
