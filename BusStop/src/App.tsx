import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import NotFound from "./pages/NotFound"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
