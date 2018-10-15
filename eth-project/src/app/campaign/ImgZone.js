import React from "react";
import { Icon, Button, Image, Loader } from "semantic-ui-react";

const ImgZone = props => {
  switch (props.status) {
    case "uploaded":
      return <div>
          <Image size="tiny" centered src={props.file[0].preview} />
          <Button size="tiny" compact disabled basic color="green" style={{ marginTop: "5px", textAlign: "center" }} onClick={props.onClick}>
            UPLOADED
          </Button>
        </div>;

    case "uploading":
      return <div>
          <Loader active inline />
          <Button size="tiny" compact disabled basic color="yellow" style={{ marginTop: "5px", textAlign: "center" }} onClick={props.onClick}>
            UPLOADING
          </Button>
        </div>;

    case "dropped":
      return <div>
          <Image size="tiny" centered src={props.file[0].preview} />
          <Button size="tiny" compact basic color="pink" style={{ marginTop: "5px", textAlign: "center" }} onClick={props.onClick}>
            UPLOAD
          </Button>
        </div>;

    case "failed":
      return <div>
          <Button size="tiny" compact disabled basic color="red" style={{ marginTop: "5px", textAlign: "center" }} onClick={props.onClick}>
            FAILED
          </Button>
        </div>;

    default:
      return <div>
          <Icon circular size="large" name="photo" />
          <p>Drop your photo or click here to upload</p>
        </div>;
  }
};

export default ImgZone;
