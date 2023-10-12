import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------



const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  

  return (
    <>
      <Helmet>
        <title> Login | Tricare Services </title>
      </Helmet>

      <StyledRoot>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6' style={{background:"#007F6D",borderRadius:"0 0 100px 0"}}><br/>
              <Logo />
              <Box
                sx={{
                  display: 'flex',
                 
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '95vh', // Set the minimum height to full viewport height
                }}
              >
                <Card variant="outlined" sx={{  borderRadius:'30px',minWidth: 275, maxWidth: 600, padding: 2 ,height:"70vh",boxShadow:"5px 5px 10px black"}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,padding:'20px'}}>
                    <Typography variant="h4" gutterBottom>
                      TriCare Services
                    </Typography><br/>
                    <LoginForm />
                  </Box>
                </Card>
              </Box>
            </div>
            <div className='col-md-6'>
                <Box>
                  <img src='/assets/login.png' alt='login'/>
                </Box>
            </div>
          </div>
        </div>
      </StyledRoot>
    </>
  );
}
