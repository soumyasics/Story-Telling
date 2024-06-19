import React from "react";
import "./UpgradeToWriter.css";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";

function UpgradeToWriter() {
  return (
    <div>
    <Header/>
    <div className="UpgradeToWriter-Div1">
      <div className=" UpgradeToWriter-Div2">
        <h1 className="UpgradeToWriter-h1-1">Upgrade To Writer!</h1>

        <div className="UpgradeToWriter-Div3">
          <h2 className="UpgradeToWriter-h2-2">Premium</h2>

          <div className="UpgradeToWriter-Div4">
            <p>Write unlimited stories</p>
            <p>Uninterrupted Ad-Free Experience</p>
            <p>Create Branching Narratives</p>
          </div>

          <div className="UpgradeToWriter-Div5">
            <input
              type="radio"
              name="SubscriptionPrice"
              className="UpgradeToWriter-Radio"
            />
            Monthly Price - 150$ <br />
            <input
              type="radio"
              name="SubscriptionPrice"
              className="UpgradeToWriter-Radio"
            />
            Yearly Price - 1250$
          </div>
        </div>

        <button class="btn btn-dark px-5 py-2">Continue</button>
      </div>
    </div>
    <Footer/>
    </div>

  );
}

export default UpgradeToWriter;
