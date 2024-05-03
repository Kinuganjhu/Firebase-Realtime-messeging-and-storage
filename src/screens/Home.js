import { db } from '../api/Firebase';
import UploadFile from './UploadFile'
import { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';


export default function Home() {
  const [message, setMessage] = useState('');
  const [userMessage, setUserMessage] = useState([]);

  useEffect(() => {
    const messageRef = ref(db, 'users');
    const fetchMessage = () => {
      onValue(messageRef, (snapshot) => {
        const userMessages = snapshot.val();
        if (userMessages) {
          const messageList = Object.keys(userMessages).map((userId) => ({
            id: userId,
            message: userMessages[userId].message,
          }));
          setUserMessage(messageList);
        }
      });
    };
    fetchMessage();
    return () => {
      //cleanup function
    };
  }, []);

  const handleSendMessage = () => {
    const messageRef = ref(db, 'users');
    push(messageRef, {
      message: message
    });
    setMessage('');
  };

  return (
    <div>
      <h4>Realtime Messaging</h4>
      <div>
        {userMessage.map((item) => (
          <div key={item.id}>
            {item.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type='text' placeholder='enter message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <UploadFile/>
        <button onClick={handleSendMessage}>send message</button>
      </div>
    </div>
  );
}
