import Homepage from "./components/Homepage";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Register from "./components/Register";
import Header from "./components/Header";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Buynow from "./components/Buynow";
import AdminOrders from "./components/AdminOrders";
import AdminRoute from "./components/AdminRoute";
import Contact from "./components/Contact";
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
      <Route 
        path="/allorders" 
        element={<AdminRoute isAdmin={true}><AdminOrders/></AdminRoute>}
      />
      <Route exact path="/*" element={<ErrorPage/>}></Route>
      <Route exact path="/contact" element={<Contact/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
