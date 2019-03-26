import React from 'react'
import {Card} from 'semantic-ui-react'
import {Header} from 'react-bootstrap';
import SectionCard from '../components/SectionCard.js'


const SectionContainer = ({sections}) => {
    return(
      <React.Fragment>
      {/*<div className='section_container'>*/}
        <h1>Classes</h1>
        <p>Learn that new skill you've been curious about</p>

        {/*<CardDeck>
          {sections.map(section => {
              return <SectionCard
              section={section}
              key={section.id}
              // clickedSectionFunction={clickedSectionFunction}
            />}
          )}
        </CardDeck>*/}

        <Card.Group>
      {sections.map(section => {
          return <SectionCard
          section={section}
          key={section.id}
          // clickedSectionFunction={clickedSectionFunction}
        />}
      )}
      </Card.Group>
      {/*</div>*/}
    </React.Fragment>
    )
  }

export default SectionContainer
