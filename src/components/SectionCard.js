import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';


class SectionCard extends Component {

  render() {
    let price = parseFloat(this.props.section.price)
    let fixedPrice = price.toFixed(2)

    return (
        <Card
          onClick={() => this.props.history.push(`/class/${this.props.section.id}`)}>
          <Image src={this.props.section.img_url} />
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
        </Card>

    );
  }
}

export default withRouter(SectionCard)
