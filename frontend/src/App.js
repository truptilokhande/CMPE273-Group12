import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import SideBar from "./containers/Sidebar/Sidebar";
import Tags from "./components/Tags/Tags";
import Users from "./components/Users/Users";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import QuestionOverview from "./components/QuestionOverview/QuestionOverview";
import TagOverview from "./components/TagOverview/TagOverview";
import SearchPage from "./components/SearchPage/SearchPage";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import EditQuestion from "./components/EditQuestion/EditQuestion";
// import Footer from './containers/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="d-flex">
        <SideBar />

        <div className="content container-fluid mt-4 ml-3 p-0 mb-4">
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/tags" exact element={<Tags />} />
            <Route path="/users" exact element={<Users />} />
            <Route path="/askQuestion" exact element={<AskQuestion />} />
            <Route
              path="/questionOverview"
              exact
              element={<QuestionOverview />}
            />
            <Route path="/tagOverview" exact element={<TagOverview />} />
            <Route path="/search" exact element={<SearchPage />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/edit-question" exact element={<EditQuestion />} />
          </Routes>
        </div>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
