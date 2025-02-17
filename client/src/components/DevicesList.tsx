import React from "react";
import { useSystemStore } from "../store";
import { sendRemoteCommand } from "../services/api";

const DevicesList: React.FC = () => {
  const { devices } = useSystemStore();

  if (!Array.isArray(devices)) {
    console.error("devices is not an array!", devices);
    return <div className="text-red-500 text-center mt-4">שגיאה בטעינת הנתונים</div>;
  }

  // אתחול מחדש
  const handleReboot = async (deviceId: string) => {
    try {
      console.log(`Sending reboot command to device: ${deviceId}`);
      await sendRemoteCommand(deviceId, "reboot");
      console.log(`Reboot command sent successfully to ${deviceId}`);
    } catch (error) {
      console.error(`Failed to send reboot command:`, error);
    }
  };

  // הפעלה מחדש
  const handleRestart = async (deviceId: string) => {
    try {
      console.log(`Sending restart command to device: ${deviceId}`);
      await sendRemoteCommand(deviceId, "restart");
      console.log(`Restart command sent successfully to ${deviceId}`);
    } catch (error) {
      console.error(`Failed to send restart command:`, error);
    }
  };

  // כיבוי
  const handleShutdown = async (deviceId: string) => {
    try {
      console.log(`Sending shutdown command to device: ${deviceId}`);
      await sendRemoteCommand(deviceId, "shutdown");
      console.log(`Shutdown command sent successfully to ${deviceId}`);
    } catch (error) {
      console.error(`Failed to send shutdown command:`, error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* כותרת */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">רשימת מכשירים</h2>

      {/* טבלה רספונסיבית */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="border px-4 py-2">שם מכשיר</th>
              <th className="border px-4 py-2">סטטוס</th>
              <th className="border px-4 py-2">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="border hover:bg-gray-50 transition duration-200">
                <td className="border px-4 py-2">{device.name}</td>
                <td className="border px-4 py-2">{device.status}</td>
                <td className="border px-4 py-2 space-x-2 flex">
                  {/* אתחול מחדש */}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow transition duration-200"
                    onClick={() => handleReboot(device.id)}
                    aria-label="אתחול מכשיר"
                  >
                    אתחל
                  </button>

                  {/* הפעלה מחדש */}
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow transition duration-200"
                    onClick={() => handleRestart(device.id)}
                    aria-label="הפעל מחדש מכשיר"
                  >
                    הפעל מחדש
                  </button>

                  {/* כיבוי */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow transition duration-200"
                    onClick={() => handleShutdown(device.id)}
                    aria-label="כיבוי מכשיר"
                  >
                    כבה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevicesList;