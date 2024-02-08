import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./Components/Admin/AdminLogin";
import ViewerLogin from "./Components/Viewer/ViewerLogin";
import ViewerRegister from "./Components/Viewer/ViewerRegister";
import EditorLogin from "./Components/Editor/EditorLogin";
import EditorRegister from "./Components/Editor/EditorRegister";
import Landingpage from "./Components/Landingpage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element=<AdminLogin /> />
        <Route path="/viwerlogin" element={[<Header/>,<ViewerLogin />,<Footer/>]} />
        <Route path="/editorlogin" element=<EditorLogin /> />
        <Route path="/viwerregister" element=<ViewerRegister /> />
        <Route path="/editorregister" element=<EditorRegister /> />
        <Route path='/landingpage' element=<Landingpage/> />
        <Route path='/header' element=<Header/> />
        <Route path='/footer' element=<Footer/> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
