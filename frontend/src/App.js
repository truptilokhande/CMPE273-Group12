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
import ProfilePage from "./components/Profile/ProfilePage";
import Activities from "./components/Profile/Activities/Activities";
import Questionstab from "./components/Profile/Activities/Questions/Questionstab";
import UserTags from "./components/Profile/Activities/UserTags/UserTags";
import ActivityBadges from "./components/Profile/Activities/ActivityBadges/ActivityBadges";
import Bookmarkstab from "./components/Profile/Activities/Bookmarkstab/Bookmarkstab";
import Reputation from "./components/Profile/Activities/Reputation/Reputation";
import BasicDetails from "./components/Profile/BasicDetails/BasicDetails";
import Addtag from "./components/Admin/Addtag";
import Aproove from "./components/Admin/Aproove";
import { connect } from "react-redux";

function App({ isAuthenticated }) {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="d-flex">
        <SideBar />

        <div className="content container-fluid mt-4 ml-3 p-0 mb-4">
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/homepage" exact element={<Homepage />} />
            <Route path="/tags" exact element={<Tags />} />
            <Route path="/users" exact element={<Users />} />
            <Route
              path="/askQuestion"
              exact
              element={isAuthenticated ? <AskQuestion /> : <SignIn />}
            />
            <Route path="questionOverview">
              <Route path=":id" element={<QuestionOverview />} />
            </Route>
            <Route path="/tagOverview" exact element={<TagOverview />} />
            <Route path="/search" exact element={<SearchPage />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route
              path="/edit-question"
              exact
              element={isAuthenticated ? <EditQuestion /> : <SignIn />}
            />
            <Route path="/userProfile" exact element={<ProfilePage />} />
            <Route path="/Activities" exact element={<Activities />} />
            <Route
              path="/Questions/Questionstab"
              exact
              element={<Questionstab />}
            />
            <Route path="/UserTags/UserTags" exact element={<UserTags />} />
            <Route
              path="/ActivityBadges/ActivityBadges"
              exact
              element={<ActivityBadges />}
            />
            <Route
              path="/Bookmarkstab/Bookmarkstab"
              exact
              element={<Bookmarkstab />}
            />
            <Route
              path="/Reputation/Reputation"
              exact
              element={<Reputation />}
            />
            <Route path="/BasicDetails" exact element={<BasicDetails />} />
            <Route path="/Addtag" exact element={<Addtag />} />
            <Route path="/Aproove" exact element={<Aproove />} />
          </Routes>
        </div>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, null)(App);
