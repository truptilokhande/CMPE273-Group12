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
import Chat from "./components/Messages/Chat";
import AllChats from "./components/Messages/AllChats";
// import Footer from './containers/Footer/Footer';
// import Footer from './containers/Footer/Footer';
import { connect } from "react-redux";
import TimeLine from "./components/QuestionOverview/TimeLine";
import QuestionAnalytics from "./components/Analytics/QuestionAnalytics";
import TopQuestions from "./components/Analytics/TopQuestions";
import TopTags from "./components/Analytics/TopTags";
import HighReputedUsers from "./components/Analytics/HighReputedUsers";
import LowReputedUsers from "./components/Analytics/LowReputedUsers";
import EditDetails from "./components/Profile/EditProfile";

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
            <Route
              path="/tags"
              exact
              element={isAuthenticated ? <Tags /> : <SignIn />}
            />
            <Route
              path="/users"
              exact
              element={isAuthenticated ? <Users /> : <SignIn />}
            />
            <Route
              path="/askQuestion"
              exact
              element={isAuthenticated ? <AskQuestion /> : <SignIn />}
            />
            <Route path="questionOverview">
              <Route
                path=":id"
                element={isAuthenticated ? <QuestionOverview /> : <SignIn />}
              />
            </Route>
            <Route path="/tagOverview">
              <Route
                path=":id"
                element={isAuthenticated ? <TagOverview /> : <SignIn />}
              />
            </Route>
            <Route path="/timeline">
              <Route
                path=":id"
                element={isAuthenticated ? <TimeLine /> : <SignIn />}
              />
            </Route>
            <Route
              path="/search"
              exact
              element={isAuthenticated ? <SearchPage /> : <SignIn />}
            />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route
              path="/edit-question"
              exact
              element={isAuthenticated ? <EditQuestion /> : <SignIn />}
            />
            <Route
              path="/userProfile"
              exact
              element={isAuthenticated ? <ProfilePage /> : <SignIn />}
            />
            <Route
              path="/Activities"
              exact
              element={isAuthenticated ? <Activities /> : <SignIn />}
            />
            <Route
              path="/Questions/Questionstab"
              exact
              element={<Questionstab />}
            />
            <Route
              path="/UserTags/UserTags"
              exact
              element={isAuthenticated ? <UserTags /> : <SignIn />}
            />
            <Route
              path="/ActivityBadges/ActivityBadges"
              exact
              element={isAuthenticated ? <ActivityBadges /> : <SignIn />}
            />
            <Route
              path="/Bookmarkstab/Bookmarkstab"
              exact
              element={isAuthenticated ? <Bookmarkstab /> : <SignIn />}
            />
            <Route
              path="/Reputation/Reputation"
              exact
              element={isAuthenticated ? <Reputation /> : <SignIn />}
            />
            <Route
              path="/BasicDetails"
              exact
              element={isAuthenticated ? <BasicDetails /> : <SignIn />}
            />
            <Route
              path="/Addtag"
              exact
              element={isAuthenticated ? <Addtag /> : <SignIn />}
            />
            <Route
              path="/Aproove"
              exact
              element={isAuthenticated ? <Aproove /> : <SignIn />}
            />
            <Route
              path="/chat"
              exact
              element={isAuthenticated ? <Chat /> : <SignIn />}
            />
            <Route
              path="/allchats"
              exact
              element={isAuthenticated ? <AllChats /> : <SignIn />}
            />
            <Route
              path="/edit-question"
              exact
              element={isAuthenticated ? <EditQuestion /> : <SignIn />}
            />
            <Route
              path="/userProfile/:id"
              exact
              element={isAuthenticated ? <ProfilePage /> : <SignIn />}
            />
            <Route
              path="/Activities/:id"
              exact
              element={isAuthenticated ? <Activities /> : <SignIn />}
            />
            <Route
              path="/Questions/Questionstab/:id"
              exact
              element={<Questionstab />}
            />
            <Route
              path="/UserTags/:id"
              exact
              element={isAuthenticated ? <UserTags /> : <SignIn />}
            />
            <Route
              path="/ActivityBadges/:id"
              exact
              element={isAuthenticated ? <ActivityBadges /> : <SignIn />}
            />
            <Route
              path="/Bookmarkstab/Bookmarkstab/:id"
              exact
              element={<Bookmarkstab />}
            />
            <Route
              path="/Reputation/:id"
              exact
              element={isAuthenticated ? <Reputation /> : <SignIn />}
            />
            <Route
              path="/BasicDetails"
              exact
              element={isAuthenticated ? <BasicDetails /> : <SignIn />}
            />
            <Route
              path="/Addtag"
              exact
              element={isAuthenticated ? <Addtag /> : <SignIn />}
            />
            <Route
              path="/Aproove"
              exact
              element={isAuthenticated ? <Aproove /> : <SignIn />}
            />
            <Route
              path="/timeline"
              exact
              element={isAuthenticated ? <TimeLine /> : <SignIn />}
            />
            <Route
              path="/questionAnalytics"
              exact
              element={isAuthenticated ? <QuestionAnalytics /> : <SignIn />}
            />
            <Route
              path="/topViewedQuestions"
              exact
              element={isAuthenticated ? <TopQuestions /> : <SignIn />}
            ></Route>

            <Route
              path="/topTags"
              exact
              element={isAuthenticated ? <TopTags /> : <SignIn />}
            ></Route>
            <Route
              path="/highReputedUsers"
              exact
              element={isAuthenticated ? <HighReputedUsers /> : <SignIn />}
            ></Route>
            <Route
              path="/lowReputedUsers"
              exact
              element={isAuthenticated ? <LowReputedUsers /> : <SignIn />}
            ></Route>
            <Route
              path="/Editdetails/:id"
              exact
              element={isAuthenticated ? <EditDetails /> : <SignIn />}
            />
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
