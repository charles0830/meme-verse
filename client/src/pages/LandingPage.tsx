import { Box, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Box mt="5" p="2" w="60%">
      <Heading fontWeight="black" mb="3" size="4xl">
        A Simple Meme Sharing Web Application
      </Heading>
      <Link to="/t">
        <Button mt="10" size="lg" colorScheme="messenger">
          Explore Now
        </Button>
      </Link>
    </Box>
  );
};

export default LandingPage;
