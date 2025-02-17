import React, { useEffect } from 'react';
import { useSystemStore } from './store';
import Navbar from './components/Navbar';
import DevicesList from './components/DevicesList';
import SoftwareInstall from './components/SoftwareInstall';
import RemoteCommand from './components/RemoteCommand';

const App: React.FC = () => {
  const { devices, loadDevices } = useSystemStore();
  
  useEffect(() => {
    console.log("🔄 Loading devices...");
    loadDevices().then(() => {
      console.log("✅ Devices Loaded:", devices);
    });
  }, [devices, loadDevices]); // ✅ הוספת devices לתלויות
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ניהול מכשירים</h1>
        <DevicesList />
        <div className="mt-8">
          <RemoteCommand />
        </div>
        <div className="mt-8">
          <SoftwareInstall />
        </div>
      </div>
    </div>
  );
};

export default App;