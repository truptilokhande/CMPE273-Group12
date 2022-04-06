import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import SideBar from "./containers/Sidebar/Sidebar";
import Tags from "./components/Tags/Tags";
import Users from "./components/Users/Users";
import AskQuestion from "./components/AskQuestion/AskQuestion";
// import Footer from './containers/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <main className="d-flex">
          <SideBar />
          <div className="content container-fluid mt-4 ml-3 p-0">
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/tags" exact element={<Tags />} />
              <Route path="/users" exact element={<Users />} />
              <Route path="/askQuestion" exact element={<AskQuestion />} />
            </Routes>
          </div>
        </main>
        {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
