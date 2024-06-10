import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./Components/Admin/AdminLogin";
import ViewerLogin from "./Components/Viewer/ViewerLogin";
import ViewerRegister from "./Components/Viewer/ViewerRegister";
import EditorLogin from "./Components/Editor/EditorLogin";
import EditorRegister from "./Components/Editor/EditorRegister";
import Landingpage from "./Components/Pages/Landingpage";
import Header from "./Components/Pages/Header";
import Footer from "./Components/Pages/Footer";
import Viewerforgotpassword from "./Components/Viewer/Viewerforgotpassword";
import Editorforgotpassword from "./Components/Editor/Editorforgotpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/viwerlogin" element={[<Header/>,<ViewerLogin />,<Footer/>]} />
        <Route path="/editorlogin" element={[<Header/>,<EditorLogin />,<Footer/>]} />
        <Route path="/viwerregister" element={[<Header/>,<ViewerRegister /> ,<Footer/>]}/>
        <Route path="/editorregister" element={[<Header/>,<EditorRegister />,<Footer/>]} />
        {/* <Route path='/landingpage' element={<Landingpage/>} /> */}
        <Route path="/viewerforgotpassword" element={[<Header/>,<Viewerforgotpassword /> ,<Footer/>]}/>
        <Route path="/editorforgotpassword" element={[<Header/>,<Editorforgotpassword /> ,<Footer/>]}/>
        <Route path="/" element={[<Landingpage/> ,<Footer/>]}/>
        <Route path='/header' element={<Header/>} />
        <Route path='/footer' element={<Footer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
