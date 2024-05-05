import { useState, useEffect } from 'react';
import { auth} from './Firebase';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className='app'>
      {user && (
        <div className='profile-info'>
          {user.photoURL && <img src={user.photoURL} className='user-image' alt='User' />}
          <h3>{user.displayName}</h3>
        </div>
      )}
    </div>
  );
}
