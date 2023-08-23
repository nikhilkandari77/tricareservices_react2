import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// mocks_
import { toast } from 'react-toastify';
import account from '../../../_mock/account';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    id: 'home',
    label: 'Home',
    icon: 'eva:home-fill',
  },
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
    // navigate("/")
  };
  const handleClick = (id) => {
  
    if (id === 'home') {
      // toast.warn("Complaint has been rejected sucessfully");
      setOpen(null);
      navigate("/")
    } else {
      setOpen(null);
    }
  
  }
  

  const handleLogout = () => {

    // Clear the user's authentication token or session-related data
    localStorage.removeItem('token'); // Replace 'token' with the key used to store the token or session data
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    // history.push('/login'); // Replace '/login' with the route for your login page
    navigate("/login");
  };



  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',

              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),

            },
          }),
        }}
      >
        <Avatar style={{ marginTop: '-75%' }} src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,

            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {localStorage.getItem('name')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {localStorage.getItem('email')}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1, }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClick(option.id)}>
              {option.label}
            </MenuItem>
        ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>



  );
}
