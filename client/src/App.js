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

function App() {
  const url="http://localhost:4025/"

  // const url= "http://hybrid.srishticampus.in:4025/"

  return (
    <BrowserRouter basename="/story_telling">
      <Routes>
        <Route path="/login" element={<WriterLogin  />} />
        <Route path="/register" element={<WriterRegister  />} />
        <Route path="/forgot" element={<Writerforgotpassword />} />
        <Route path="/" element={[<Landingpage />, <Footer />]} />
        <Route path="/reset-password/:id" element={<WriterResetPassword />} />
        <Route path="/upgradetowriter" element={<UpgradeToWriter />} />
        <Route path="/writerhome" element={<WriterHome />} />
        <Route path="/readerhome" element={<ReaderHome />} />


        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
        <Route path="/admindashboardsub" element={<AdminDashboardSub />} />
        <Route path="/request" element={<Requests url={url} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

