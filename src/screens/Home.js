import { database } from '../api/Firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ref, push, onValue, remove } from 'firebase/database'
import { FormControl, InputGroup, Button } from 'react-bootstrap'

export default function Home() {
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const fetchMessage = () => {
      const messageRef = ref(database, 'users')
      onValue(messageRef, (snapshot) => {
        const userMessages = snapshot.val()
        if (userMessages) {
          const messageList = Object.keys(userMessages).map((userId) => ({
            id: userId,
            message: userMessages[userId].message,
            createdBy: userMessages[userId].createdBy,
          }))
          setUserMessage(messageList)
        }
      })
    }
    fetchMessage()
    // Get the current user
    setCurrentUser("User1") // Replace "User1" with the current user's ID or name
    return () => {
      //
    }
  }, [])

  const handleChangeText = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    const messageRef = ref(database, 'users')
    push(messageRef, {
      message: message,
      createdBy: currentUser // Saving the current user who sent the message
    })
    setMessage('')
  }

  const handleDeleteMessage = (id) => {
    const messageRef = ref(database, `users/${id}`)
    remove(messageRef)
  }

  return (
    <div className="container mt-5">
      <Link to="/">Go Back Home</Link>
      {userMessage.map((item) => (
        <div 
          key={item.id} 
          className={`message-container mt-3 ${item.createdBy === currentUser ? 'text-right' : 'text-left'}`}
        >
          <h6>{item.message}</h6>
          {item.createdBy === currentUser && (
            <button 
              className="btn btn-danger" 
              onClick={() => handleDeleteMessage(item.id)}
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <div className="bottom mt-5">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter message"
            aria-label="Message"
            aria-describedby="basic-addon2"
            value={message}
            onChange={handleChangeText}
          />
          <Button variant="primary" id="button-addon2" onClick={handleSendMessage}>
            Send message
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
