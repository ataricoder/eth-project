import React from "react";
import ItemList from './ItemList'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Explore = () => (
  <div>
    <NavBar active="explore" fixed={true} />
    <div style={{padding: '6em 0'}}>
      <ItemList />
    </div>
    <Footer fixed={false}/>
  </div>
);

export default Explore;
