import React from 'react';
import { useAuth0 } from './auth/react-auth0-spa';
import { Flex, Box, Button, Linkton, theme } from 'adaptiv-ui';
import acsLogo from '../assets/images/acsLogo.png';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Flex h="10rem" stretch>
      <Box w="30rem">
        <img src={acsLogo} alt="angel city sports" />
      </Box>
      <Flex stretch jc_end ai_center>
        <Box w="3rem" />

        {/* If a user is not logged in (authenticated), will redirect to Auth0 log in modal. */}
        {!isAuthenticated && (
          <Button
            border={`2px solid ${theme.primary}`}
            primary
            aria-label="Access log in modal"
            onClick={() => loginWithRedirect({})}
            jc_center
            h='5rem'
            w='10rem'
          >
            Log in
          </Button>
        )}

        <Box w="3rem" />
        <Button
          border={`2px solid ${theme.primary}`}
          primary
          onClick={() => loginWithRedirect({})}
          jc_center
          h='5rem'
          w='10rem'
        >
          Sign Up
        </Button>

        {isAuthenticated && (
          <Linkton
            border={`2px solid ${theme.primary}`}
            primary
            to="/dashboard"
          >
            Profile
          </Linkton>
        )}

        {/* If a user is logged in (authenticated), log out functionality will be enabled.) */}
        {isAuthenticated && (
          <Button
            border={`2px solid ${theme.primary}`}
            primary
            aria-label="log out"
            onClick={() => logout()}
          >
            Log out
          </Button>
        )}

        <Box w="3rem" />
      </Flex>
    </Flex>
  );
};

export default NavBar;