import React from 'react'
import { Menu, Image } from 'semantic-ui-react'

const Footer = props => (
  <Menu
      fixed={props.fixed ? "bottom" : null}
      style={{marginTop: props.fixed ? '1em' : '10em'}}
      borderless
      size="tiny"
    >
      <Menu.Item position="right" name='github' icon="github" href='https://github.com/danysexymexy' target='_blank'/>
      <Menu.Item name='LinkedIn' icon="linkedin" href='https://www.linkedin.com/in/codingdude/' target='_blank'/>
      <Menu.Item position="right">
        <span>© 2018 Daniel Munoz</span>
      </Menu.Item>
    </Menu>
)

export default Footer
