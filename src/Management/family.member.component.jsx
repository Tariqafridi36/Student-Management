import { Button, Modal } from 'bootstrap'
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { studentAction } from '../Flux/_actions/student.action'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './style.css'
import { useEffect } from 'react'
import store from '../Flux/store/student.store'

const familyTypes = [
  { ID: 1, Name: 'Parent' },
  { ID: 2, Name: 'Sibling' },
  { ID: 3, Name: 'Spouse' },
]

const FamilyMember = (props) => {
  const { familyMembers, rowData } = props
  const [familyModel, setFamilyModel] = useState({
    list:[],
    firstname:"",
    lastname:"",
    dob:new Date(),
    relationship:"",
    nationality:""
  })

  useEffect(()=>{
    debugger
    const members = store.getFamilyMembers();
    setFamilyModel({...familyMembers, list: members});
  }, [])

  return (
    <React.Fragment>
      <div className="main-pannel">
        <div className="pannel-title">Family Members</div>

{familyMembers.list.map((row) =>{
  
})}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </React.Fragment>
  )
}

export default FamilyMember
