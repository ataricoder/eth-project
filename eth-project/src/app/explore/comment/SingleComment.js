import React from 'react'
import { Comment } from 'semantic-ui-react'

const SingleComment = (props) => (
  <Comment>
    <Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />
    <Comment.Content>
      <Comment.Author>{props.name}</Comment.Author>
      <Comment.Metadata>
        <span>{props.date}</span>
      </Comment.Metadata>
      <Comment.Text>{props.content}</Comment.Text>
      <Comment.Actions>
        <a>Reply</a>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
}

export default SingleComment
