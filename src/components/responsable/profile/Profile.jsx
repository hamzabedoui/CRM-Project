import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, selectLogin } from '../../../redux/features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Avatar, CircularProgress } from '@mui/material';
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfos, loading, error } = useSelector(selectLogin);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userInfos) {
      setName(userInfos.name);
      setEmail(userInfos.email);
    }
  }, [userInfos]);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);
  
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => navigate('/main-responsable/profile'))
      .catch((error) => console.error('Profile update failed:', error));
  };

  // Define the avatarUrl variable here
  const avatarUrl = avatar
    ? URL.createObjectURL(avatar)
    : userInfos?.avatar
    ? `http://localhost:5000/uploads/${userInfos.avatar}`
    : '';

  return (
    <div className="profile-update-container">
      <h2>Update Profile</h2>
      {loading && <CircularProgress />}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="avatar-upload">
          <Avatar
            src={avatarUrl} // Use the avatarUrl variable here
            alt="User Avatar"
            sx={{ width: 100, height: 100 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Profile;
