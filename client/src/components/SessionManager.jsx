// src/SessionManager.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function SessionManager() {
  const { expiresAt, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && expiresAt && Date.now() > expiresAt) {
      dispatch(logout());
      navigate('/login');
    }
  }, [expiresAt, isAuthenticated, dispatch, navigate]);

  return null;
}

export default SessionManager;
