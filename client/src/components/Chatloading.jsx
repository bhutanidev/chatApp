import React from 'react'
import { Stack , Skeleton } from '@chakra-ui/react'

const Chatloading = () => {
  return (
    <>
    <Stack>
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
        <Skeleton height='45px' />
    </Stack>
    </>
  )
}

export default Chatloading