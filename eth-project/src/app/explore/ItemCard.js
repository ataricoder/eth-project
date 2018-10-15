import React from "react";
import { Card, Icon, Image, Progress } from "semantic-ui-react";

const ItemCard = props => {

  const {
    title,
    currency,
    target,
    description,
    raised,
    duration,
    startDate,
    cardImgUrl
  } = props;

  const dayLeft = parseInt( ((new Date(startDate) - new Date()) / (24*60*60*1000)) + parseInt(duration, 10) , 10);

  return (
    <Card style={{ textAlign: "left" }} raised onClick={props.onClick}>
      <Image src={cardImgUrl} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span>{description}</span>
        </Card.Meta>
        <Card.Description>
          <Progress percent={ parseInt(raised * 100 / target, 10) } indicating>
            <div style={{ textAlign: "left" }}>{`${raised} ${currency} raised`}</div>
          </Progress>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="time" />
        {dayLeft} days left
      </Card.Content>
    </Card>
  );
}

export default ItemCard;
