import React, { useState } from "react";
import { useSystemStore } from "../store";
import { sendRemoteCommand } from "../services/api";
import { Box, Button, Input, Select, VStack, Text, Spinner } from "@chakra-ui/react";

const RemoteCommand: React.FC = () => {
  const { devices } = useSystemStore();
  const [selectedDevice, setSelectedDevice] = useState("");
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState(""); // ✅ אחסון פלט הפקודה
  const [isLoading, setIsLoading] = useState(false); // ✅ חיווי למשתמש בזמן שליחה

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDevice && command) {
      setIsLoading(true);
      setOutput(""); // איפוס פלט קודם

      const response = await sendRemoteCommand(selectedDevice, command);
      
      if (response?.output) {
        setOutput(response.output); // הצגת הפלט
      } else {
        setOutput("❌ שגיאה בביצוע הפקודה.");
      }

      setIsLoading(false);
    }
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="gray.50">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>שליחת פקודות למכשיר</Text>

      <VStack spacing={4} align="stretch">
        <Select placeholder="בחר מכשיר..." value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </Select>

        <Input
          placeholder="הכנס את הפקודה כאן..."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />

        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!selectedDevice || !command} isLoading={isLoading}>
          שלח פקודה
        </Button>

        {/* ✅ תצוגת טרמינל לפלט הפקודה */}
        {output && (
          <Box
            bg="black"
            color="green.300"
            p={4}
            borderRadius="md"
            fontFamily="monospace"
            whiteSpace="pre-wrap"
            maxHeight="200px"
            overflowY="auto"
          >
            {isLoading ? <Spinner size="sm" /> : output}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default RemoteCommand;