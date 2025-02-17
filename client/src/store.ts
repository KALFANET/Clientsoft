import { create } from 'zustand';
import { fetchDevices } from './services/api';

interface Device {
  id: string;
  name: string;
  status: string;
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
      set({ devices });
    } catch (error) {
      console.error("Failed to load devices:", error);
    }
  },
}));