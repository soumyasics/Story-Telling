import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import WriterLogin from "./Components/Writer/WriterLogin";
import Landingpage from "./Components/Pages/Landingpage";
import Header from "./Components/Pages/Header";
import Footer from "./Components/Pages/Footer";
import WriterRegister from "./Components/Writer/WriterRegister";
import Writerforgotpassword from "./Components/Writer/Writerforgotpassword";
import WriterResetPassword from "./Components/Writer/WriterResetPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/writerlogin" element={<WriterLogin userrole={"writer"} />} />
        <Route path="/readerlogin" element={<WriterLogin userrole={"reader"} />} />
        <Route path="/writerRegister" element={<WriterRegister userrole={"writer"} />} />
        <Route path="/readerRegister" element={<WriterRegister userrole={"reader"} />} />
        <Route path="/writerforgot" element={<Writerforgotpassword />} />
        <Route path="/" element={[<Landingpage />, <Footer />]} />
        <Route path="/reset-password/:id" element={<WriterResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

