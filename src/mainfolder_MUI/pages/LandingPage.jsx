import { Box, Container } from '@mui/material'
import React from 'react'
import NavBar from '../components/navsection/NavBar'
import HeroSection from '../components/hero/HeroSection'
import AccordianSection from '../components/AccordianSection'
import CardDisplay from '../components/cardsection/CardDisplay'
import MainTab from '../components/tabsection/MainTab'
import MainGraph from '../components/graphsection/MainGraph'
import EditableDataModel from "../components/EditlableTable/EditableDataModel"
import Navbar from '../../Components/Navbar'

const LandingPage = ({ mode, setMode }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <NavBar mode={mode} setMode={setMode} />
          <HeroSection />
          <AccordianSection />
          <CardDisplay />
          <MainTab />
          <MainGraph />
          <EditableDataModel />
        </Box>
      </Container>
    </>


  )
}

export default LandingPage