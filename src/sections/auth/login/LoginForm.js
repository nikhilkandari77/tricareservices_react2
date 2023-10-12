import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getToken } from 'firebase/messaging';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
import baseUrl from '../../../utils/baseUrl';
// import {  messaging } from '../../../firebase';

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
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
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


  const sendToken=(messageToken,data)=>{
    const tokenData={
      userId:data.user.id,
      roleId:data.user.role.id,
      token:messageToken
    }
    try {
      localStorage.setItem("notificationArray",JSON.stringify([]));
      const response = fetch(`${baseUrl}/api/user/messaging-token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`
        },
        body: JSON.stringify(tokenData),
      });
  }catch (error) {
    toast.warn("Something went wrong",{position:"top-center"});
}
  }
// async function requestPermission(){
//   const permission = await Notification.requestPermission()
//   let token=null;
//   if(permission==='granted'){
//     // generate token
//     token=await getToken(messaging,{vapidKey:"BDTNn8Fk3APhMt119AoD3zqK3KWMEvLsBYcYtfx3c0yqesxpt-IZsdU1xv0Sl5h54K3SKn3KFMzJrGJOLlI_nzM"})
//     console.log("token is :",token)
//   }
//   else if(permission==="denied"){
//     alert("messaging denied");
//   }
//   return token;
// }

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
    try {
      const response = await fetch(`${baseUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token and navigate on success
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('adminId',data.user.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem("isLoggedIn", true);
        // const messageToken= await requestPermission();
        // if(messageToken!==null){
        //   console.log("sending token",messageToken)
        //   sendToken(messageToken,data);
        // }
        navigate("/admin/dashboard");
      } else {
        // Handle error responses
        const errorData = await response.json();
        if (response.status === 501) {
          toast.error("invalid username or password",{position:"top-center"}); // Show alert for invalid credentials
        } 
      }
    } catch (error) {
      toast.warn("Something went wrong",{position:"top-center"});
    }
  }

    return (
      <>
      <form>
        <Stack spacing={3}>
          
          <TextField name="email" label="Email address"
            value={email} onChange={(e) => setEmail(e.target.value)}
            sx={{ m: 1, width: '20rem' }}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email} </span>}


          <TextField
            name="password"
            label="Password"
            sx={{ m: 1, width: '20rem' }}
            type={showPassword ? 'text' : 'password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password} </span>}





        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <Checkbox name="remember" label="Remember me" /> */}
          {/* <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit} >
          Login
        </LoadingButton>
        </form>
      </>
    );
  }
