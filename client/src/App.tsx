import React, { useEffect } from 'react';
import { useSystemStore } from './store';
import Navbar from './components/Navbar';
import DevicesList from './components/DevicesList';
import SoftwareInstall from './components/SoftwareInstall';
import RemoteCommand from './components/RemoteCommand';

const App: React.FC = () => {
  const { devices, loadDevices } = useSystemStore();
  console.log(devices)
  useEffect(() => {
    loadDevices().then(() => {
      console.log("Devices Loaded:", devices);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ניווט ראשי */}
      <Navbar />

      {/* תוכן הדף */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ניהול מכשירים</h1>

        {/* רשימת מכשירים */}
        <DevicesList />

        {/* ממשק לשליחת פקודות */}
        <div className="mt-8">
          <RemoteCommand />
        </div>

        {/* ממשק התקנת תוכנות */}
        <div className="mt-8">
          <SoftwareInstall />
        </div>
      </div>
    </div>
  );
};

export default App;
