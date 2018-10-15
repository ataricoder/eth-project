import React from "react";
import { Tab } from "semantic-ui-react";
import TargetFrom from "./TargetForm";
import BasicForm from "./BasicForm";
import DetailForm from "./DetailForm";
import PreviewForm from "./PreviewForm";
import { connect } from "react-redux";
import { changeTab } from "./formActionCreator";

const panes = [
  { menuItem: "Get Started", render: () => <Tab.Pane><TargetFrom /></Tab.Pane> },
  { menuItem: "Basics", render: () => <Tab.Pane><BasicForm /></Tab.Pane> },
  { menuItem: "Story", render: () => <Tab.Pane><DetailForm /></Tab.Pane> },
  { menuItem: "Preview", render: () => <Tab.Pane><PreviewForm /></Tab.Pane> }
];

const mapStateToProps = state => ({
  activeTab: state.form.activeTab,
});

const mapDispatchToProps = dispatch => ({
  onTabChange(data) {
    dispatch(changeTab(data))
  }
})

class Tabs extends React.Component{
  handleTabChange = (e, data) => {
    if(this.props.activeTab !== 0){
      this.props.onTabChange(data.activeIndex)
    }
  }

  render() {
    const { activeTab } = this.props

    return (
      <Tab
        activeIndex={activeTab}
        onTabChange={this.handleTabChange}
        menu={{ attached: true, fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
