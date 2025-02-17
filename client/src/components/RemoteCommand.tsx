import React, { useState } from 'react';
import { useSystemStore } from '../store';
import { sendRemoteCommand } from '../services/api';

const RemoteCommand = () => {
  const { devices } = useSystemStore();
  const [selectedDevice, setSelectedDevice] = useState('');
  const [command, setCommand] = useState('');

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">שליחת פקודות למכשיר</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        sendRemoteCommand(selectedDevice, command);
      }} className="space-y-4">
        <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="w-full p-2 border rounded-md">
          <option value="">בחר מכשיר...</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>{device.name}</option>
          ))}
        </select>
        <textarea value={command} onChange={(e) => setCommand(e.target.value)} className="w-full p-2 border rounded-md" placeholder="הכנס את הפקודה כאן..."/>
        <button type="submit" disabled={!selectedDevice || !command} className="w-full p-2 bg-blue-600 text-white rounded-md">שלח פקודה</button>
      </form>
    </div>
  );
};

export default RemoteCommand;
