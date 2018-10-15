import React from "react";
import Tab from "./Tab";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {Container} from "semantic-ui-react";

const Campaign = () => (
  <div>
    <NavBar active="campaign" fixed={true} />
    <div style={{padding: '6em 0'}}>
      <Container>
        <Tab />
      </Container>
    </div>
    <Footer fixed={true}/>
  </div>
);

export default Campaign;
