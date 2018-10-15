import React from "react";
import { Container, Form } from "semantic-ui-react";
import DropZone from "./DropZone";
import { connect } from "react-redux";
import { changeTab, saveChange } from "./formActionCreator";

const mapStateToProps = state => ({
  items: state.form.items,
});

const mapDispatchToProps = dispatch => ({
  onTabChange(data) {
    dispatch(changeTab(data))
  },
  onButtonClick(data) {
    dispatch(saveChange(data))
  }
})

class DetailForm extends React.Component {
  state = this.props.items;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();
    this.props.onButtonClick(this.state)
    this.props.onTabChange(3)
  }

  render() {
    const { story } = this.state;

    return <Container textAlign="left">
        <h2>Details</h2>
        <Form>
          <Form.TextArea label="Campaign Story" name="story" autoHeight rows={5} onChange={this.handleChange} placeholder="Tell Your Story..." value={story} />

          <Form.Field>
            <label>Campaign Overview Image</label>
            <DropZone />
          </Form.Field>
          <p />

          <Form.Button type="submit" color="green" onClick={this.handleClick}>
            Save & Continue
          </Form.Button>
        </Form>
      </Container>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailForm);
