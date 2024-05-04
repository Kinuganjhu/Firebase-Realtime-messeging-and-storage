import { db } from '../api/Firebase'
import { useState, useEffect } from 'react'
import { ref, push, onValue, remove } from 'firebase/database'
import Profile from '../api/Profile'
const Home = () => {
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])

  useEffect(() => {
    const fetchMessage = () => {
      const messageRef = ref(db, 'users')
      onValue(messageRef, (snapshot) => {
        const userMessages = snapshot.val()
        if (userMessages) {
          const messageList = Object.keys(userMessages).map((userId) => ({
            id: userId,
            message: userMessages[userId].message,
          }))
          setUserMessage(messageList)
        }
      })
    }
    fetchMessage()
    return () => {
      //
    }
  }, [])

  const handleChangeText = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    const messageRef = ref(db, 'users')
    push(messageRef, {
      message: message
    })
    setMessage('')
  }

  const handleDeleteMessage = (id) => {
    const messageRef = ref(db, `users/${id}`)
    remove(messageRef)
  }

  return (
    <>
    <Profile/>
    <hr/>
      {userMessage.map((item) => (
        <h6 key={item.id}>
          {item.message}
          <button onClick={() => handleDeleteMessage(item.id)}>delete</button>
        </h6>
      ))}
      <div className='bottom'>
        <input type='text' value={message} placeholder='enter message' onChange={handleChangeText} />
        <button onClick={handleSendMessage}>send message</button>
      </div>
    </>
  )
}

export default Home;
