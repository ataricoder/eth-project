import React from "react";
import { Image, Grid, Progress, Button, List, Divider, Header, Label, Icon, Modal, Input} from "semantic-ui-react";

const ItemMain = (props) => {
  const {
    title,
    currency,
    target,
    runner,
    beneficiary,
    description,
    city,
    country,
    category,
    raised = 0,
    duration,
    story,
    cardImgUrl,
    storyImgUrl,
    startDate = Date()
  } = props;

  const { children, demo, onClick, onChange, value, loading } = props;

  const dayLeft = parseInt( ((new Date(startDate) - new Date()) / (24*60*60*1000)) + parseInt(duration, 10) , 10);

  return <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Image src={cardImgUrl} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h2">
            {title}
            <Header.Subheader>{description}</Header.Subheader>
          </Header>
          <List>
            <List.Item>
              <Label basic>
                <Icon name="users" />
                Runner
                <Label.Detail>{runner}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label basic>
                <Icon name="marker" />
                {`${city}, ${country}`}
              </Label>
            </List.Item>
            <List.Item> </List.Item>
            <List.Item>
              <Label basic>
                <Icon name="like" />
                Beneficiary
                <Label.Detail>{beneficiary}</Label.Detail>
              </Label>
            </List.Item>
          </List>
          <div>
            <h3>
              {raised} {currency} raised
            </h3>
            <Progress percent={parseInt(raised * 100 / target, 10)} progress indicating>
              <Grid>
                <Grid.Column floated="left" textAlign="left" width={8}>
                  <h4>{`${parseInt(raised * 100 / target, 10)}% of ${target} ${currency}`}</h4>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <h4>{`${dayLeft} days left`}</h4>
                </Grid.Column>
              </Grid>
            </Progress>
          </div>
          <Divider hidden />
          <div>
            <Modal size="tiny" trigger={<Button color="pink" disabled={demo ? true : false}>
                  BACK IT
                </Button>}>
              <Modal.Header>{"Contribute to this Campaign"}</Modal.Header>
              <Modal.Content>
                <Input required placeholder="ETH value..." fluid type="number" name="amount" value={value} onChange={onChange} />
              </Modal.Content>
              <Modal.Actions>
                <Button color="pink" onClick={onClick} disabled={loading ? true : false} content={loading ? "Funding":"Fund"} />
              </Modal.Actions>
            </Modal>
            <Button circular floated="right" color="teal" icon="mail" />
            <Button circular floated="right" color="twitter" icon="twitter" />
            <Button circular floated="right" color="facebook" icon="facebook" />
            <Button circular floated="right" color="red" icon="heart" />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={12}>
          <div style={{ margin: "10px" }}>
            <Header as="h3" floated="right">
              {category}
            </Header>
            <Divider section />
            <Header as="h4" floated="left">
              {"Overview"}
            </Header>
            <Image src={storyImgUrl} centered fluid bordered rounded />
            <p>{story}</p>
            {children}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>;}

export default ItemMain;
