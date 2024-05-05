import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Card } from 'react-bootstrap';
import { serverTimestamp, ref, push, onValue } from 'firebase/database';
import { database } from '../api/Firebase';
import { Link } from 'react-router-dom';
export default function ChatRoom() {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [message, setMessage] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const chatRoomsRef = ref(database, 'chatRooms');
    const unsubscribe = onValue(chatRoomsRef, (snapshot) => {
      const rooms = snapshot.val();
      const chatRoomsList = [];
      for (let id in rooms) {
        chatRoomsList.push({ id, ...rooms[id] });
      }
      setChatRooms(chatRoomsList);
    });
    return () => unsubscribe();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMessage('');
    setRoomName('');
    setOpen(false);
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      setMessage('Please enter a room name');
      return;
    }
    const roomRef = ref(database, 'chatRooms');
    const newRoomRef = push(roomRef);
    const createdAt = serverTimestamp();
    const roomData = {
      roomName: roomName,
      createdAt: createdAt,
    };
    push(newRoomRef, roomData)
      .then(() => {
        setMessage(`${roomName} room has been created successfully`);
        setRoomName('');
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div style={{ margin: 10 }}>
      <h1>Whatsapp</h1>
      {message && <Alert variant="danger">{message}</Alert>}
      <p className="justify-content-md-center">
        A progressive chat app for developers. Create and invite friends to join.
      </p>
      <Button onClick={handleOpen}>Create Room</Button>
      <hr />
      
      <div className="row">
        {chatRooms.map((room) => (
          <div key={room.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{roomName}</Card.Title>
              
                <div className="text-center"> 
                  <Link to={`/Home/${room.id}`} className="btn btn-primary">Join {room.roomName}</Link>
                </div>
              </Card.Body>
              <Card.Footer>
                {/* Display other room details if any */}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomName">
              <Form.Label>Enter room name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>
            Create room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
