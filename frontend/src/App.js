import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

//import pages and components//
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/navbar/NavBar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {/* // everything to do with browser router needs to be inside this // */}
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
