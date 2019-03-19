import React, {Component} from 'react'
// import { Card, Icon, Image } from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {withRouter} from 'react-router-dom';

// // const HOST_URL = 'https://comuse-backend.herokuapp.com'
const HOST_URL = 'http://localhost:3000'

class CourseCard extends Component {

  render() {
    // let price = parseFloat(this.props.section.price)
    // let fixedPrice = price.toFixed(2)

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={HOST_URL + this.props.course.photo_url} />
        <Card.Body>
          <Card.Title>{this.props.course.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(CourseCard)
