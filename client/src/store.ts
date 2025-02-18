import { create } from 'zustand';
import { fetchDevices } from './services/api';

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  ipAddress?: string;  // ודא שהשדה קיים
  os?: string;         // מערכת הפעלה
  osVersion?: string;  // גרסת מערכת הפעלה
  cpu?: string;        // סוג מעבד
  memory?: string;     // כמות זיכרון
}

interface SystemState {
  devices: Device[];
  loadDevices: () => Promise<void>;
}

export const useSystemStore = create<SystemState>((set) => ({
  devices: [],
  loadDevices: async () => {
    try {
      const devices = await fetchDevices();
      if (!Array.isArray(devices)) {
        console.error("API response is not an array!", devices);
        set({ devices: [] }); // מניעת קריסת המערכת במקרה של שגיאה
        return;
      }

      // טיפול במקרה של שדות חסרים
      const formattedDevices = devices.map((device) => ({
        id: device.id,
        name: device.name,
        status: device.status,
        ipAddress: device.ipAddress || "לא ידוע",
        os: device.os || "לא ידוע",
        osVersion: device.osVersion || "לא ידוע",
        cpu: device.cpu || "לא ידוע",
        memory: device.memory || "לא ידוע",
      }));

      set({ devices: formattedDevices });
    } catch (error) {
      console.error("❌ Failed to load devices:", error);
    }
  },
}));