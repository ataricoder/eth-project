import React from 'react'
import Dropzone from 'react-dropzone'
import { Container } from "semantic-ui-react";
import ImgZone from './ImgZone'
import { connect } from "react-redux";
import { uploadImage, dropImage } from "./formActionCreator";

const mapStateToProps = state => ({
  status: state.form.imageStatus,
});

const mapDispatchToProps = dispatch => ({
  onDrop() {
    dispatch(dropImage())
  },
  onUpload(file) {
    dispatch(uploadImage(file))
  }
})

class DropZone extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: []
    }
  }

  handleDrop = accepted => {
    this.setState({ accepted })
    this.props.onDrop()
  }

  handleUpload = () => {
    this.props.onUpload(this.state.accepted[0]);
  }


  render() {

    const { accepted } = this.state
    const { status } = this.props

    return <div className="dropzone">
        <Dropzone multiple={false} disableClick={accepted.length ? true : false} accept="image/jpeg, image/png" onDrop={this.handleDrop}>
          <Container textAlign="center" style={{ padding: "50px" }}>
            <ImgZone file={accepted} status={status} onClick={this.handleUpload} />
          </Container>
        </Dropzone>
      </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone)
