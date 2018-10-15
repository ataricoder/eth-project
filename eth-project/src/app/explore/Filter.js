import React from 'react'
import { Menu } from 'semantic-ui-react'

class Filter extends React.Component {
  state = { activeItem: 'all' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu text vertical style={{textAlign: "left"}}>
        <Menu.Item header>CATEGORY</Menu.Item>
        <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick} />
        <Menu.Item name='Tech & Innovation' active={activeItem === 'Tech & Innovation'} onClick={this.handleItemClick} />
        <Menu.Item name='Creative Works' active={activeItem === 'Creative Works'} onClick={this.handleItemClick} />
        <Menu.Item name='Communities' active={activeItem === 'Communities'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default Filter
