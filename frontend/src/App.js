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
import TimeLine from "./components/QuestionOverview/TimeLine";
import QuestionAnalytics from "./components/Analytics/QuestionAnalytics";
import TopQuestions from "./components/Analytics/TopQuestions";
import TopTags from "./components/Analytics/TopTags";
import HighReputedUsers from "./components/Analytics/HighReputedUsers";
import LowReputedUsers from "./components/Analytics/LowReputedUsers";

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
            <Route path="/tagOverview">
              <Route path=":id" element={<TagOverview />} />
            </Route>
            <Route path="/timeline">
              <Route path=":id" element={<TimeLine />} />
            </Route>
            <Route path="/search" exact element={<SearchPage />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route
              path="/edit-question"
              exact
              element={isAuthenticated ? <EditQuestion /> : <SignIn />}
            />
            <Route path="/userProfile/:id" exact element={<ProfilePage />} />
            <Route path="/Activities/:id" exact element={<Activities />} />
            <Route
              path="/Questions/Questionstab/:id"
              exact
              element={<Questionstab />}
            />
            <Route path="/UserTags/:id" exact element={<UserTags />} />
            <Route
              path="/ActivityBadges/:id"
              exact
              element={<ActivityBadges />}
            />
            <Route
              path="/Bookmarkstab/Bookmarkstab/:id"
              exact
              element={<Bookmarkstab />}
            />
            <Route path="/Reputation/:id" exact element={<Reputation />} />
            <Route path="/BasicDetails" exact element={<BasicDetails />} />
            <Route path="/Addtag" exact element={<Addtag />} />
            <Route path="/Aproove" exact element={<Aproove />} />
            <Route path="/timeline" exact element={<TimeLine />} />
            <Route
              path="/questionAnalytics"
              exact
              element={<QuestionAnalytics />}
            />
            <Route
              path="/topViewedQuestions"
              exact
              element={<TopQuestions />}
            ></Route>

            <Route path="/topTags" exact element={<TopTags />}></Route>
            <Route
              path="/highReputedUsers"
              exact
              element={<HighReputedUsers />}
            ></Route>
            <Route
              path="/lowReputedUsers"
              exact
              element={<LowReputedUsers />}
            ></Route>
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
