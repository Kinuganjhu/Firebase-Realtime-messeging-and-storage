import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './screens/SignUp'
import Found from './screens/notFound';
import Home from './screens/Home';
import ChatRoom from './screens/createChatRoom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/Home/:roomId" element={<Home />} />
        <Route path="*" element={<Found/>} />
      </Routes>
    </Router>
  );
}
