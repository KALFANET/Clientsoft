import React from 'react';
import { useSystemStore } from '../store';
import { Box, Grid, GridItem, Text, Icon, VStack } from '@chakra-ui/react';
import { FiSmartphone, FiMonitor, FiCpu, FiDatabase } from "react-icons/fi"; 
import { FaMemory, FaMicrochip } from "react-icons/fa";

const DevicesList: React.FC = () => {
  const { devices } = useSystemStore();

  console.log("📡 Devices from store:", devices);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        📋 רשימת מכשירים
      </Text>

      {devices.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          🚫 אין מכשירים להצגה
        </Text>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {devices.map((device) => (
            <GridItem 
              key={device.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="lg" 
              boxShadow="lg" 
              textAlign="center" 
              bg="white"
              _hover={{ transform: "scale(1.03)", transition: "0.2s ease-in-out" }}
            >
              {/* אייקון בהתאם לסוג מערכת ההפעלה */}
              <Icon as={device.os.toLowerCase().includes("windows") ? FiMonitor : FiSmartphone} boxSize={12} color="blue.500" />
              
              <VStack spacing={1} mt={3} align="center">
                <Text fontSize="xl" fontWeight="bold">{device.name}</Text>
                <Text fontSize="md" color={device.status === "online" ? "green.500" : "red.500"} fontWeight="bold">
                  {device.status === "online" ? "מחובר ✅" : "מנותק ❌"}
                </Text>
                
                <Text fontSize="sm" color="gray.600"><b>כתובת IP:</b> {device.ipAddress || "לא ידוע"}</Text>
                <Text fontSize="sm" color="gray.600"><b>מערכת הפעלה:</b> {device.os || "לא ידוע"}</Text>
                <Text fontSize="sm" color="gray.600"><b>גרסה:</b> {device.osVersion || "לא ידוע"}</Text>
                <Text fontSize="sm" color="gray.600"><b>מעבד:</b> {device.cpu || "לא ידוע"}</Text>
                <Text fontSize="sm" color="gray.600"><b>זיכרון:</b> {device.memory || "לא ידוע"}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DevicesList;