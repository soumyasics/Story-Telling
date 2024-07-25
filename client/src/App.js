import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import WriterLogin from "./Components/Writer/WriterLogin";
import Landingpage from "./Components/Pages/Landingpage";
import Header from "./Components/Pages/Header";
import Footer from "./Components/Pages/Footer";
import WriterRegister from "./Components/Writer/WriterRegister";
import Writerforgotpassword from "./Components/Writer/Writerforgotpassword";
import WriterResetPassword from "./Components/Writer/WriterResetPassword";
import UpgradeToWriter from "./Components/Writer/UpgradetoWriter";
import SetupCard from "./Components/Writer/SetupCard";
import WriterHome from "./Components/Writer/WriterHome";
import ReaderHome from "./Components/Viewer/ReaderHome";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
import AdminDashboardSub from "./Components/Pages/AdminDashboardSub";
import WritersRequestList from "./Components/Pages/WritersRequestList";
import Requests from "./Components/Admin/Requests";
import WriterList from "./Components/Pages/WriterList";
import AdminviewWriters from "./Components/Admin/AdminviewWriters";
import ViewerMainNav from "./Components/Viewer/ViewerMainNav";
import WriterProfile from "./Components/Writer/WriterProfile";
import ReaderProfile from "./Components/Viewer/ReaderProfile";
import WriterEditProfile from "./Components/Writer/WriterEditProfile";
import ReaderEditProfile from "./Components/Viewer/ReaderEditProfile";
import WritterMainNav from "./Components/Writer/WritterMainNav";
import WriterStoryAddPage from "./Components/Writer/WriterStoryAddPage";
import WriterStoryEditPage from "./Components/Writer/WriterStoryEditPage";
import WriterStoryViewPage from "./Components/Writer/WriterStoryViewPage";
import AllReader from "./Components/Viewer/AllRreader";
import WriterViewStories from "./Components/Writer/WriterViewStories";
import ViewAPublishedStory from "./Components/Writer/ViewAPublishedStory";
import ReaderViewStories from "./Components/Viewer/ReaderViewStories";
import ReaderViewApublishedStory from "./Components/Viewer/ReaderViewApublishedStory";
import WriterAddChallenges from "./Components/Challenges/WriterAddChallenges";
import WriterEditChallenges from "./Components/Challenges/WriterEditChallenges";
import WriterViewSummaryChallenge from "./Components/Writer/WriterViewSummaryChallenge";
import ReaderViewSummaryChallenge from "./Components/Viewer/ReaderViewSummaryChallenge";
import ViewChallengers from "./Components/Admin/ViewChallengers";
import ViewChallengersTitle from "./Components/Admin/ViewChallengersTitle";
import AnnounceChallengeSummary from "./Components/Admin/AnnounceChallengeSummary";
import ViewChallengeSummary from "./Components/Admin/ViewChallengeSummary";
import AdminNav from "./Components/Pages/AdminNav";
import WriterChallengeHistory from "./Components/Writer/WriterChallengeHistory";
import WriterViewChallengeSummary from "./Components/Writer/WriterViewChallengeSummary";
import WriterNewStoryChallenge from "./Components/Writer/WriterNewStoryChallenge";
import WriterParticipatechallenge from "./Components/Writer/WriterParticipatechallenge";
import WriterEndChallenge from "./Components/Writer/WriterEndChallenge";
import ReaderViewChallenges from "./Components/Viewer/ReaderViewChallenges";
import WriterPublishedStoryChallenge from "./Components/Writer/WriterPublishedStoryChallenge";
import WriterViewChallenge from "./Components/Writer/WriterViewChallenge";
import ReaderViewparticipatedChallenge from "./Components/Viewer/ReaderViewparticipatedChallenge";
import ReaderViewParticipatebychallengeid from "./Components/Viewer/ReaderViewParticipatebychallengeid";
import ReaderchallengeHistory from "./Components/Viewer/ReaderchallengeHistory";
import WriterAddPart from "./Components/Writer/WriterAddPart";
import AboutUs from "./Components/Pages/About";
import ReaderEndChallenge from "./Components/Viewer/ReaderEndChallenge";
import Contact from "./Components/Pages/Contact";
import ReaderViewOneCustomizedStory from "./Components/Viewer/ReaderViewOneCustomizedStory";
function App() {
  // const url = "http://localhost:4025/";

  const url= "http://hybrid.srishticampus.in:4025/"

  return (
    <BrowserRouter basename="/story_telling">
      <Routes>
        <Route path="/login" element={<WriterLogin />} />
        <Route path="/register" element={<WriterRegister />} />
        <Route path="/forgot" element={<Writerforgotpassword />} />
        <Route path="/" element={[<Landingpage />, <Footer />]} />
        <Route path="/reset-password/:id" element={<WriterResetPassword />} />
        <Route path="/upgradetowriter" element={<UpgradeToWriter />} />
        <Route path="/writerhome" element={<WriterHome />} />
        <Route path="/readerhome" element={<ReaderHome />} />
        <Route path="/readernav" element={<ViewerMainNav />} />
        <Route path="/aboutus" element={[<Header/>,<AboutUs />,<Footer/>]} />
        <Route path='/contact' element={[<Header/>,<Contact/>,<Footer/>]} />

        {/* Writer */}
        <Route path="/writer-profile" element={[<WritterMainNav/>,<WriterProfile url={url} />,<Footer/>]} />
        <Route path="/writer-edit-profile" element={[<WritterMainNav/>,<WriterEditProfile/>,<Footer/>]} />
        <Route path="/writer-add-customstory" element={[<WritterMainNav/>,<WriterStoryAddPage/>,<Footer/>]} />
        <Route path="/writer-view-customstory" element={[<WritterMainNav/>,<WriterStoryViewPage/>,<Footer/>]} />
        <Route path="/writer-edit-customstory/:id" element={[<WritterMainNav/>,<WriterStoryEditPage/>,<Footer/>]} />
        <Route path="/writer-view-stories" element={[<WritterMainNav/>,<WriterViewStories url={url} />,<Footer/>]} />
        <Route path="/writer-view-a-stories/:storyid" element={[<WritterMainNav/>,<ViewAPublishedStory url={url} />,<Footer/>]} />
        <Route path="/writer-view-summary-challenge" element={[<WritterMainNav/>,<WriterViewSummaryChallenge/>,<Footer/>]} />
        <Route path="/writer-add-part/:id" element={[<WritterMainNav/>,<WriterAddPart/>,<Footer/>]} />

        {/* Reader */}
        <Route path="/reader-profile" element={[<ViewerMainNav/>,<ReaderProfile url={url}/>,<Footer/>]} />
        <Route path="/reader-edit-profile/:id" element={[<ViewerMainNav/>,<ReaderEditProfile/>,<Footer/>]} />
        <Route path="/reader-view-stories" element={[<ViewerMainNav/>,<ReaderViewStories url={url}/>,<Footer/>]} />
        <Route path="/reader-view-a-stories/:storyid" element={[<ViewerMainNav/>,<ReaderViewApublishedStory url={url}/>,<Footer/>]} />
        <Route path="/reader-view-summary-challenge" element={[<ViewerMainNav/>,<ReaderViewSummaryChallenge/>,<Footer/>]} />

        {/* Challenges */}
        <Route path="/writer-add-challenges" element={[<WritterMainNav/>,<WriterAddChallenges/>,<Footer/>]} />
        <Route path="/writer-edit-challenges/:challengeid" element={[<WritterMainNav/>,<WriterEditChallenges/>,<Footer/>]} />
        <Route path="/writer-challenge-history/:id" element={[<WritterMainNav/>,<WriterChallengeHistory/>,<Footer/>]} />
        <Route path="/writer-viewsummary-challenge/:challengeid" element={[<WritterMainNav/>,<WriterViewChallengeSummary/>,<Footer/>]} />
        <Route path="/writer-newstory-challenge" element={[<WritterMainNav/>,<WriterNewStoryChallenge/>,<Footer/>]} />
        <Route path="/writer-participate-challenge/:challengeid" element={[<WritterMainNav/>,<WriterParticipatechallenge/>,<Footer/>]} />
        <Route path="/writer-end-challenge" element={[<WritterMainNav/>,<WriterEndChallenge/>,<Footer/>]} />
        <Route path="/readerviewnewchallenges" element={[<ViewerMainNav/>,<ReaderViewChallenges />,<Footer/>]} />
        <Route path="/writer-published-story-challenge" element={[<WritterMainNav/>,<WriterPublishedStoryChallenge/>,<Footer/>]} />
        <Route path="/writer-view-challenge" element={[<WritterMainNav/>,<WriterViewChallenge/>,<Footer/>]} />
        <Route path="/readerviewparticipatedchallenges" element={[<ViewerMainNav/>,<ReaderViewparticipatedChallenge />,<Footer/>]} />
        <Route path="/reader-participate-challenge/:challengeid" element={[<ViewerMainNav/>,<ReaderViewParticipatebychallengeid/>,<Footer/>]} />
        <Route path="/reader-challenge-history/:id" element={[<ViewerMainNav/>,<ReaderchallengeHistory/>,<Footer/>]} />
        <Route path="/reader-end-challenge" element={[<ViewerMainNav/>,<ReaderEndChallenge/>,<Footer/>]} />
        <Route path="/reader-viewsummary-challenge/:challengeid" element={[<ViewerMainNav/>,<ReaderViewSummaryChallenge/>,<Footer/>]} />
        <Route path="/readerview-one-customized-story" element={[<ViewerMainNav/>,<ReaderViewOneCustomizedStory/>,<Footer/>]} />

        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
        <Route path="/admindashboardsub" element={<AdminDashboardSub />} />
        <Route path="/admindashviewchallengers" element={[<AdminNav/>,<ViewChallengers />,<Footer/>]} />
        <Route path="/admindashviewchallengesTitle/:id" element={[<AdminNav/>,<ViewChallengersTitle />,<Footer/>]} />
        <Route path="/announcechallengesummary/:id" element={[<AdminNav/>,<AnnounceChallengeSummary />,<Footer/>]} />
        <Route path="/viewchallengesummary/:id" element={[<AdminNav/>,<ViewChallengeSummary/>,<Footer/>]} />
        <Route path="/request" element={<Requests url={url} />} />
        <Route path="/writers" element={<AdminviewWriters url={url} />} />
        <Route path="/readers" element={<AllReader url={url} />} />

       {/* add part */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
