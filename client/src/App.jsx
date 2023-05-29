import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Shorten from './pages/Shorten.jsx';
import Spare from './pages/Spare.jsx';
import Full from './pages/Full.jsx';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/url' element={<Shorten/>}/>
        <Route path='/spare' element={<Spare/>}/>
        <Route path='/fix' element={<Full/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
