import React from 'react'
import { Card } from 'semantic-ui-react'
import SectionCard from '../components/SectionCard.js'


const SectionContainer = ({sections}) => {
    return(
      <div>
        <h2>Sections:</h2>
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
