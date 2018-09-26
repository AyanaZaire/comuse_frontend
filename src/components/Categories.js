import React, {Component} from 'react'
import { Card, Label, Header, Image } from 'semantic-ui-react'
// import {withRouter} from 'react-router-dom';


class Categories extends Component {

  render() {
    return (
        <React.Fragment>
          <Header as='h2'>
            Categories
            <Header.Subheader>Find what you're looking for by category</Header.Subheader>
          </Header>

          <Card.Group itemsPerRow={5}>
            {this.props.categories.map(category => {
              return <Card>
                <Card.Content>
                  <Header as='h3'>
                    <Image
                      // circular
                      src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> {category.name}
                  </Header>
                </Card.Content>
              </Card>
              // return <Label as='a' image size='massive'>
              //   <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
              //   {category.name}
              // </Label>
            })}
          </Card.Group>
        </React.Fragment>
    );
  }
}

export default Categories
