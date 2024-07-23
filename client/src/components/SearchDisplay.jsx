import React from 'react'
import { Box , Avatar ,Text, background } from '@chakra-ui/react'
const SearchDisplay = ({pic,username,email,handlefunction}) => {
  return (
    <>
        <Box onClick={handlefunction} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'} paddingBlock={2} borderBlockEnd={'black'} _hover={{background:'#E8E8E8'} }>
            <Avatar src={pic} size='sm'/>
            <Box display={'flex'} flexDirection={'column'}>
                <Text fontSize='large'>{username}</Text>
                <Text alignItems={'center'} justifyContent={'space-between'} fontSize='medium'>{email}</Text>
            </Box>
        </Box>

    </>
  )
}

export default SearchDisplay