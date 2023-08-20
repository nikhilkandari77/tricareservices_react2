import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import baseUrl from '../../../utils/baseUrl';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const url = baseUrl;

  console.log(url);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');
  // const [username, setUsername] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  // const users = [{ email: "bkc@gmail.com", password: "testpassword" }];



  // const validateEmail = (email) => {
  //   // Regex pattern to validate email format
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const validatePassword = (password) => {
    // Regex pattern to validate password format (at least 6 characters)
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Perform validation


     const newErrors = {};
     if (email.trim().length === 0) {
      newErrors.email = 'Invalid email format';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 
    else {
     // sorry

    }

    
    const username = email; 
    const response = await fetch(`${baseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },

      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Save the token to local storage or state for future API requests
      setMessage('Login successful');
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('token', data.token);
      localStorage.setItem("isLoggedIn",true);
      navigate("/dashboard");
    }
    else if (!response.ok){

      alert('Invalid Credential')

     }
    
    
    
    
    
    else {
      setMessage(data.message);
    }


  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
        />
         {errors.email && <span style={{color:"red"}}>{errors.email} </span>}


        <TextField
          name="password"
          label="Password"
          
          type={showPassword ? 'text' : 'password'}
          value={password} onChange={(e) => setPassword(e.target.value)} 
          // InputProps={{
          //   // endAdornment: (
          //   //   <InputAdornment position="end">
          //   //     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          //   //       <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          //   //     </IconButton>
          //   //   </InputAdornment>
          //   // ),
          // }}
        />
           {errors.password && <span style={{color:"red"}}>{errors.password} </span>}





      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" style={{marginLeft:'75%'}}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit} style={{marginTop:'8%'}}>
        Login
      </LoadingButton>
    </>
  );
}
