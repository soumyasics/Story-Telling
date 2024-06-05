import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Editorforgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <p className="viewerloginhead text-center fs-2 m-3">Reset Password</p>

      <form className="viewerloginform">
        <label className="m-2">Password</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="password"
            placeholder="user name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <label className="m-2">New Password</label>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="password"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <label className="fs-5 mb-3">Sign up</label>
        <div id="alertuser"></div>
        <div className="text-center">
          <button type="submit" className="viewerloginbtn ps-5 pe-5 p-2">
            Reset
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

export default Editorforgotpassword;
