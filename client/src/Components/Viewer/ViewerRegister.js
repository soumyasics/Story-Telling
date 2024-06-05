import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './viewerlogin.css'

function ViewerRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const ViewerRegisterChange = () => {

  };

  return (
    <div>
    <p className="viewerloginhead text-center fs-2 m-3">Sign Up</p>
    <div >
      <form className="viewerloginform">
      <label className="m-2">Username</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="user name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
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
        <label className="m-2">DOB</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="date"
            placeholder="Date of birth"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group><label className="m-2">About</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="About"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <label className="fs-5 mb-3">Already have an account,Login</label>
        <div id="alertuser"></div>
        <div className="text-center">
          <button type="submit" className="viewerloginbtn ps-5 pe-5 p-2">
            Sign Up
          </button>{" "}
        </div>
      </form>
    </div>
    </div>
  );
}

export default ViewerRegister;
