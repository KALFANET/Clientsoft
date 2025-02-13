import React from "react";
import { useSystemStore } from "./store";

const App: React.FC = () => {
  const { devices } = useSystemStore();

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-xl font-bold">Network Manager</h1>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Connected Devices</h2>
        <ul className="mt-4">
          {devices.length > 0 ? (
            devices.map((device: { id: string; name: string; status: string; os: string }) => (
              <li key={device.id} className="bg-gray-50 p-2 rounded shadow mt-2">
                {device.name} - {device.status} - <strong>{device.os.toUpperCase()}</strong>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No devices connected.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;