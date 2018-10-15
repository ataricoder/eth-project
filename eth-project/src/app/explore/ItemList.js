import React from "react";
import { connect } from "react-redux";
import { fetchItems } from "./exploreActionCreator";
import { Grid, Container, Card, Loader, Dimmer, Input, Divider } from "semantic-ui-react";
import ItemCard from "./ItemCard";
import Filter from "./Filter";
import history from "../../utils/history"

const mapStateToProps = state => ({
  items: state.items,
  token: state.auth.token
});

class ItemList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchItems());
  }

  handleClick = (id) => {
    history.push("/explore/" + id);
  }

  render() {
    const { error, loading, items } = this.props.items;

    if (error) {
      console.log(error.message)
      return <div>Error! No Item Found</div>;
    }

    if (loading && items.length === 0){
      return <Container>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      </Container>
    }

    return <Container>
        <Grid>
          <Grid.Column width={4}>
            <div>
              <Filter />
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            <Input action={{ color: "grey", labelPosition: "left", icon: "search", content: "Search" }} actionPosition="left" placeholder="Search..." fluid />
            <Divider hidden />
            <Card.Group itemsPerRow={3}>
              {items.map(item => (
                <ItemCard
                  onClick={() => this.handleClick(item.id)}
                  key={item.id}
                  { ...item }
                />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>;
  }
}

export default connect(mapStateToProps)(ItemList);
