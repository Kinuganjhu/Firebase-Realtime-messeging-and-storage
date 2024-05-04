import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth} from './Firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/'); // Redirect to login page if user is not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('Sign out successful');
        navigate('/');
      })
      .catch((error) => {
        alert('Error signing out:', error.message);
      });
  };

  return (
    <div className='app'>
      {user && (
        <div className='profile-info'>
          {user.photoURL && <img src={user.photoURL} className='user-image' alt='User' />}
          <h3>Hey, {user.displayName}</h3>
        </div>
      )}
   
      <Button variant ='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>
   
  );
}
