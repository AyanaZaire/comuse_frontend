import React, {Component} from 'react'
import { Card, Label, Header, Image } from 'semantic-ui-react'
import {Nav, Row, Col, ListGroup, Tab} from 'react-bootstrap';
// import {withRouter} from 'react-router-dom';


class Categories extends Component {

  render() {
    return (
        <React.Fragment>
          {/*<Header as='h2'>
            Categories
            <Header.Subheader>Find what you're looking for by category</Header.Subheader>
          </Header>

          <Nav size="lg" variant="pills">
          {this.props.categories.map(category => {
            return <Nav.Item onClick={this.props.onClickCategoryHandler} id={category.name}>
              <Nav.Link>{category.name}</Nav.Link>
            </Nav.Item>
          })}
          </Nav>*/}

          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#allClasses">
            <Row>
              <Col sm={2}>
                <ListGroup style={{paddingBottom: "30px"}}>
                  <ListGroup.Item
                    action
                    href="#allClasses"
                    onClick={this.props.allClasses}
                  >
                    All Classes
                  </ListGroup.Item>
                  {this.props.categories.map(category => {
                    return <ListGroup.Item
                      action
                      href={`#${category.name}`}
                      onClick={this.props.onClickCategoryHandler}
                      id={`#${category.name}`}>
                      {category.name}
                    </ListGroup.Item>
                    {/*<ListGroup.Item
                      action
                      href="#Textile"
                      onClick={this.props.onClickCategoryHandler}
                      id="Textile">
                      Textile
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="#Music"
                      onClick={this.props.onClickCategoryHandler}
                      id="Music">
                      Music
                    </ListGroup.Item>*/}
                  })}
                </ListGroup>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                <Tab.Pane eventKey="#allClasses">
                  {this.props.categorizedSections}
                </Tab.Pane>
                  <Tab.Pane eventKey="#Arts">
                    {this.props.categorizedSections}
                  </Tab.Pane>
                  <Tab.Pane eventKey="#Textile">
                    {this.props.categorizedSections}
                  </Tab.Pane>
                  <Tab.Pane eventKey="#Music">
                    {this.props.categorizedSections}
                  </Tab.Pane>
                  <Tab.Pane eventKey="#Technology">
                    {this.props.categorizedSections}
                  </Tab.Pane>
                  <Tab.Pane eventKey="#Design">
                    {this.props.categorizedSections}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>;

          {/*<Card.Group itemsPerRow={5}>
            {this.props.categories.map(category => {
              return <Card onClick={this.props.onClickCategoryHandler} id={category.name}>
                <Card.Content>
                  <Header as='h3'>
                    <Image
                      style={{width: "50px", height: "50px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${category.img_url})`}} />{category.name}
                  </Header>
                </Card.Content>
              </Card>
            })}
          </Card.Group>*/}
        </React.Fragment>
    );
  }
}

export default Categories
