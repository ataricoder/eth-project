import React from 'react'
import { Grid, Image, Header, Container, Divider } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: '/static/images/slide1.jpg',
    description: 'The Most Creative Design Works'
  },
  {
    original: '/static/images/slide2.jpg',
    description: 'The Coolest AR Technology'
  },
  {
    original: '/static/images/slide3.jpg',
    description: 'Translate a great book to different languages for people around the world'
  }
]

const Marketing = () => (
  <Container>
    <Header style={{ color: "#2b5fa7" }} as="h1" textAlign="left">
      FEATURED
    </Header>
    <ImageGallery autoplay={true} showFullscreenButton={false} showThumbnails={false} showBullets={true} items={images} />
    <Divider section hidden />
    <Header style={{ color: "#2b5fa7" }} as="h1" textAlign="left">
      TRENDING
    </Header>
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Image
            rounded
            src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png"
          />
        </Grid.Column>
        <Grid.Column>
          <Image
            rounded
            src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png"
          />
        </Grid.Column>
        <Grid.Column>
          <Image
            rounded
            src="http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Marketing
