import Homepage from "./components/Homepage";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import Header from "./components/Header";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Buynow from "./components/Buynow";
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route index element={<Login/>}/>
      <Route exact path="/dashboard" element={<Homepage/>}></Route>
      <Route exact path="/register" element={<Register/>}></Route>
      <Route exact path="/login"  element={<Login/>}></Route>
      <Route exact path="/buynow" element={<Buynow/>}></Route>
      <Route exact path="/*" element={<ErrorPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
