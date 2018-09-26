import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import SectionCard from '../components/SectionCard.js'


const SectionContainer = ({sections}) => {
    return(
      <div className='section_container'>
        <Header as='h2'>
          Classes
          <Header.Subheader>Learn that new skill you've been curious about</Header.Subheader>
        </Header>
        <Card.Group>
      {sections.map(section => {
          return <SectionCard
          section={section}
          key={section.id}
          // clickedSectionFunction={clickedSectionFunction}
        />}
      )}
      </Card.Group>
      </div>
    )
  }

export default SectionContainer
