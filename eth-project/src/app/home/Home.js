import React from "react";
import HomeContainer from "./HomeContainer";
import Marketing from "./Marketing"
import { Container } from 'semantic-ui-react'

const Home = () =>
  <HomeContainer>
    <Container className="homeContent">
      <Marketing />
    </Container>
  </HomeContainer>


export default Home
