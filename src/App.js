import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import MenuBar from './MenuBar';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{marginTop:'100px'}}>
      <MenuBar />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
