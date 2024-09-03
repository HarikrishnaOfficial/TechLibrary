import { Box } from '@mui/material'
import React from 'react'

const HeroImage = () => {
  return (
    <Box sx={{ display:'flex', flexDirection:'center',
      justifyContent:'center', alignItems:'center', textAlign:'center',
       width:'100%'
     }}>
        <img alt='Student' src='assets/student.png' style={{ width:'100%' }} />
    </Box>
  )
}

export default HeroImage