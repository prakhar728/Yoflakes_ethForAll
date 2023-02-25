import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ConnectToWallet = () => {
  return (
    <Box height={"60%"} display="flex" alignItems={"center"} justifyContent="center">
      <Text fontSize="3xl" textAlign={"center"} >
        You need to connect to the wallet my man!
      </Text>
    </Box>
  )
}

export default ConnectToWallet