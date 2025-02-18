import React from 'react';
import { Box, VStack, Text, Icon } from '@chakra-ui/react';
import { FiHardDrive, FiSettings, FiDownload } from "react-icons/fi";

const Sidebar = () => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg="gray.100"
      p={5}
      boxShadow="lg"
      display={{ base: "none", md: "block" }}
    >
      <VStack spacing={8} align="stretch">
        <Text fontSize="lg" fontWeight="bold">ניהול מכשירים</Text>
        <Box display="flex" alignItems="center">
          <Icon as={FiHardDrive} mr={2} />
          <Text>מכשירים מחוברים</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Icon as={FiSettings} mr={2} />
          <Text>שליחת פקודות</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Icon as={FiDownload} mr={2} />
          <Text>התקנת תוכנה</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;