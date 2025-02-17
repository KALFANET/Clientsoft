import React, { useState } from 'react';
import { useSystemStore } from '../store';
import { sendRemoteCommand } from '../services/api';

const RemoteCommand: React.FC = () => {
  const { devices } = useSystemStore();
  const [selectedDevice, setSelectedDevice] = useState('');
  const [command, setCommand] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDevice && command) {
      await sendRemoteCommand(selectedDevice, command);
      alert(`Command "${command}" sent to device ${selectedDevice}`);
    }
  };

  return (
    <div>
      <h2>שליחת פקודות למכשיר</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
          <option value="">בחר מכשיר...</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="הכנס את הפקודה כאן..."
        />
        <button type="submit" disabled={!selectedDevice || !command}>
          שלח פקודה
        </button>
      </form>
    </div>
  );
};

export default RemoteCommand; 