import {React} from 'react'
import { useDisclosure , Modal , ModalFooter , ModalBody , ModalHeader , ModalContent , ModalCloseButton, IconButton , ModalOverlay, Avatar} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({user,children}) => {
    // console.log(children);
    const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(user)
  return (
    <>
    {children ? (<span onClick={onOpen}>{children}</span>):(<IconButton icon={<ViewIcon/>} onClick={onOpen}/>)}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.userName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' alignItems={'center'} justifyContent={'space-around'}>
            {/* <Lorem count={2} /> */}
            <Avatar src={user.pic} size='xl'/>
            {user.email}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

export default ProfileModal