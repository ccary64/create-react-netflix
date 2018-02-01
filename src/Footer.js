import React from 'react'
import { List, Divider, Container, Image, Segment } from 'semantic-ui-react'

const Footer = () => (
  <Segment
    inverted
    vertical
    style={{ margin: '5em 0em 0em'}}
  >
    <Container textAlign='center'>

      <Divider inverted section />
      <Image
        centered
        size='mini'
        src='/chris-flix.jpg'
      />
      <List horizontal inverted divided link>
        <List.Item as='a' href='#'>Site Map</List.Item>
        <List.Item as='a' href='#'>Contact Us</List.Item>
        <List.Item as='a' href='#'>Terms and Conditions</List.Item>
        <List.Item as='a' href='#'>Privacy Policy</List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;