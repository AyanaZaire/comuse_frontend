import React, {Component} from 'react'
// import { Card, Icon, Image } from 'semantic-ui-react'
import {Card, Button, Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

const HOST_URL = 'https://comuse-backend.herokuapp.com'
// const HOST_URL = 'http://localhost:3000'

class SectionCard extends Component {

  render() {
    console.log(this.props.section)
    let price = parseFloat(this.props.section.price)
    let fixedPrice = price.toFixed(2)

    return (
      <React.Fragment>
      <Card
        style={{ width: '18rem' }}
        onClick={() => this.props.history.push(`/class/${this.props.section.id}`)}
      >
        <Card.Img variant="top" src="https://i-h1.pinimg.com/564x/f9/1b/05/f91b05d520a79211a4392a04cae52aec.jpg" />
        <Card.Body>
          <Card.Title>{this.props.section.title}</Card.Title>
          {this.props.parent == "profile" ? null : <Card.Subtitle className="mb-2 text-muted">{this.props.section.category.name}</Card.Subtitle>}
          <Card.Text>
            {this.props.section.description.substring(0, 70)}...
          </Card.Text>
            {this.props.parent == "profile" ? null : <Image
              style={{width: "30px", height: "30px"}}
              src="https://avatars1.githubusercontent.com/u/892860?s=460&v=4"
              roundedCircle/>}
           {this.props.parent == "profile" ? null : <span style={{paddingLeft: "10px"}}>{this.props.section.teacher.name}</span> }
          {/*<Button className="right floated" variant="primary">{fixedPrice}</Button>*/}
        </Card.Body>
      </Card>

        {/*<Card
          onClick={() => this.props.history.push(`/class/${this.props.section.id}`)}>
          <Image src={HOST_URL + this.props.section.photo_url} />
          <Card.Content>
            <Card.Header>{this.props.section.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.section.category.name}</span>
            </Card.Meta>
            <Card.Description>
              <Image
                style={{width: "30px", height: "30px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${this.props.section.teacher.img_url})`}}
                avatar />
                <span>{this.props.section.teacher.name}</span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className="right floated">
                <Icon name='dollar'/>{fixedPrice}
            </span>
              <a>
                <Icon name='map pin'/>{this.props.section.location}
              </a>
          </Card.Content>
        </Card>*/}
        </React.Fragment>
    );
  }
}

export default withRouter(SectionCard)
