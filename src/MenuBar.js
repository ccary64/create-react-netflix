import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'

const MenuBar = (props) => {
  const hasItems = Boolean(props.movies.length);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <Image
            size='mini'
            src='/chris-flix.jpg'
            style={{ marginRight: '1.5em' }}
          />
          <Link to={`/`}>Chris-Flix</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`/queue`}>Queue {(hasItems) ?
            <Icon color='teal' bordered circular>{props.movies.length}</Icon>
             : null}
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.list || []
  }
};
const ConnectedMenuBar = connect(mapStateToProps)(MenuBar);
export default ConnectedMenuBar