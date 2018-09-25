import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';


class SectionCard extends Component {

  render() {
    return (
        <Card
          onClick={() => this.props.history.push(`/class/${this.props.section.id}`)}>
          <Image src='https://mistrzwitold.com/wp-content/uploads/2018/02/method-1024x768.jpg' />
          <Card.Content>
            <Card.Header>{this.props.section.title}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.section.category.name}</span>
            </Card.Meta>
            <Card.Description>
              <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                <span>{this.props.section.teacher.name}</span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className="right floated">
                <Icon name='dollar'/>{this.props.section.price}
            </span>
              <a>
                <Icon name='map pin'/>{this.props.section.location}
              </a>
          </Card.Content>
        </Card>

    );
  }
}

export default withRouter(SectionCard)
