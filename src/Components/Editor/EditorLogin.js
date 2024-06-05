import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './editorlogin.css'

function EditorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
    <div>
    <p className="editorloginhead text-center fs-2 m-3">Sign In</p>
    <div >
      <form className="editorloginform" style={{padding:"2% 30%"}}>
      <label className="m-2">Email</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <label className="m-2">Password</label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
       <p>Reset password </p>
       <p className="editormovetosignup">Sign up</p>

        <div id="alertuser"></div>
        <div className="text-center">
          <button type="submit" className="editorloginbtn ps-5 pe-5 p-2">
            Log in
          </button>{" "}
        </div>
      </form>
    </div>
  </div>

    </div>
  )
}

export default EditorLogin
