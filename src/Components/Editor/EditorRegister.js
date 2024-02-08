import React, { useState } from "react";
import "./editorregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
// import validator from 'validator'
import { useNavigate } from "react-router-dom";

function EditorRegister() {
  const [editorRegister, setEditorRegister] = useState({
    // firstname: "",
    // lastname: "",
    // gender: "",
    // dob: "",
    // mobile: "",
    // email: "",
    // password: "",
    // street: "",
    // city: "",
    // country: "",
    // pincode: "",
    // image: "",
  });

  const navigate = useNavigate();

  const EditorRegisterChange = () => {};
  return (
    <div>
      <form>
        
      </form>
    </div>
  );
}

export default EditorRegister;
