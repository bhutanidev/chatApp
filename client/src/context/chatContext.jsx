import { createContext ,useContext , useState , useEffect } from 'react';
import React from 'react';
import axios from 'axios';

export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const[fetchChatsAgain,setFetchChatsAgain] = useState(false)



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/success');
        // const{}
        // console.log(response.data)
        if(response.data){
          const {email,userName,pic,id} = response.data
          setUser({email,userName,pic,id});
        }

        // console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  return (
    <ChatContext.Provider value={{ user, setUser , selectedChat, setSelectedChat , chats, setChats ,fetchChatsAgain,setFetchChatsAgain }}>
      {children}
    </ChatContext.Provider>
  );
}

// export const ChatState = ()=>{return useContext(ChatContext)}

