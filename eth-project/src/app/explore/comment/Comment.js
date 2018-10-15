import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import SingleComment from "./SingleComment"

const Comment = (props) => (
  <Comment.Group minimal>
    <Header as='h3' dividing>Comments</Header>

    {props.comments.map(comment => (
      <SingleComment
        key={comment.id}
        { ...comment }
      />
    ))}

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)

export default Comment
