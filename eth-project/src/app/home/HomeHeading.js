import React from 'react'
import { Header, Container, Grid, Image, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const HomeHeading = ({ mobile }) => (
  <Container id="jumbotron" fluid>
    <Header
      as="h2"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    >
      <p>Blockchain based crowd funding platform</p>
      <p>Be part of the future, Be a backer.</p>
      <Grid style={{ margin: "2em" }}>
        <Grid.Row centered columns={6}>
          <Grid.Column>
            <Header
              as='h2'
              inverted
              icon
              textAlign="center">
              <Icon name='cubes' circular />
              <Header.Content>
                Decentralized
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header
              as='h2'
              inverted
              icon
              textAlign="center">
              <Icon name='linkify' circular />
              <Header.Content>
                Trusted
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header
              as='h2'
              inverted
              icon
              textAlign="center">
              <Icon name='pied piper hat' circular />
              <Header.Content>
                Innovative
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Header>
  </Container>
);

HomeHeading.propTypes = {
  mobile: PropTypes.bool
}

export default HomeHeading
