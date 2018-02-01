import React, {Component} from 'react';
import { Header, Image } from 'semantic-ui-react'


export default class EmptyContainer extends Component {
  render() {
    return (
      <div style={{height: '70vh'}}>
        <Image
          centered
          src={'/emptycontainer.jpg'}
          />
        <Header textAlign='center' as='h1'>You have to add something</Header>
      </div>
    );
  }
}
