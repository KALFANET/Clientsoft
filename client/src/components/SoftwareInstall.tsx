import React, { useState } from 'react';
import { useSystemStore } from '../store';
import { installSoftware } from '../services/api';

const SoftwareInstall = () => {
  const { devices } = useSystemStore();
  const [selectedDevice, setSelectedDevice] = useState('');
  const [softwareUrl, setSoftwareUrl] = useState('');
  const [os, setOs] = useState(''); // הוספת משתנה מערכת הפעלה

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">התקנת תוכנות</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            installSoftware(selectedDevice, softwareUrl, os); // מעביר 3 פרמטרים
          }}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  בחר מכשיר
                </label>
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">בחר מכשיר...</option>
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מערכת הפעלה
                </label>
                <select
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">בחר מערכת הפעלה...</option>
                  <option value="windows">Windows</option>
                  <option value="macos">MacOS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  קישור להתקנה
                </label>
                <input
                  type="url"
                  value={softwareUrl}
                  onChange={(e) => setSoftwareUrl(e.target.value)}
                  placeholder="הכנס קישור להתקנת התוכנה..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!selectedDevice || !softwareUrl || !os}
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  התחל התקנה
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoftwareInstall;
