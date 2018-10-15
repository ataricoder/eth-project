import React from "react";
import { Container, Form, Dropdown } from "semantic-ui-react";
import DropZone from "./DropZone";
import { connect } from "react-redux";
import { changeTab, saveChange } from "./formActionCreator";
import moment from "moment";

const options = [
  { key: "tech", text: "TECH & INNOVATION", value: "Tech & Innovation" },
  { key: "art", text: "CREATIVE WORKS", value: "Creative Works" },
  { key: "project", text: "COMMUNITIES", value: "Communities" }
];

const mapStateToProps = state => ({
  items: state.form.items,
  firstName: state.auth.userInfo.firstName,
  lastName: state.auth.userInfo.lastName
});

const mapDispatchToProps = dispatch => ({
  onTabChange(data) {
    dispatch(changeTab(data))
  },
  onButtonClick(data) {
    dispatch(saveChange(data))
  }
})

class BasicForm extends React.Component {
  state = this.props.items;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectChange = (e, { value }) => {
    this.setState({ category: value });
  };

  handleClick = e => {
    e.preventDefault()
    this.props.onButtonClick({...this.state, runner: this.props.firstName + " " + this.props.lastName})
    this.props.onTabChange(2)
  }

  render() {
    const {
      beneficiary,
      beneAccount,
      description,
      city,
      country,
      category,
      duration
    } = this.state;

    const runner = this.props.firstName + " " + this.props.lastName;
    const { title } = this.props.items;
    const dueDate = moment().add(duration, 'days').calendar(); 

    return <Container textAlign="left">
        <h2>Basics</h2>
        <Form>
          <Form.Input fluid label="Campaign Title" name="title" placeholder="Campaign title..." value={title} required />

          <Form.Input label="The Runner" name="runner" placeholder="Runner..." value={runner} required />

          <Form.Input label="The Beneficiary" name="beneficiary" placeholder="Beneficiary..." value={beneficiary} onChange={this.handleChange} required />

          <Form.Input label="The Beneficiary ETH Account (This is important!)" name="beneAccount" placeholder="Beneficiary ETH Account..." value={beneAccount} onChange={this.handleChange} required />

          <Form.TextArea autoHeight label="Description" name="description" placeholder="Campaign description..." value={description} onChange={this.handleChange} required />

          <Form.Field required>
            <label>Campaign Card Image</label>
            <DropZone />
          </Form.Field>

          <h4>Location</h4>
          <Form.Group widths="equal">
            <Form.Input label="City" name="city" placeholder="City" type="text" value={city} onChange={this.handleChange} required />
            <Form.Input label="Country" name="country" placeholder="Country" type="text" value={country} onChange={this.handleChange} required />
          </Form.Group>

          <Form.Field required>
            <label>Category</label>
            <Dropdown onChange={this.handleSelectChange} options={options} placeholder="Select a Category" selection value={category} />
          </Form.Field>

          <Form.Input fluid label="Campaign Duration" name="duration" type="number" width={5} value={duration} onChange={this.handleChange} required />

          <h5>Due Date: {dueDate}</h5>

          <Form.Button type="submit" color="green" onClick={this.handleClick}>
            Save & Continue
          </Form.Button>
        </Form>
      </Container>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm);
