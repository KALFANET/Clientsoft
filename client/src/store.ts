import {create } from "zustand";
import { fetchDevices } from "../services/api";

interface Device {
  id: string;
  name: string;
  status: string;
  os: string; // ✅ הוספת שדה מערכת ההפעלה
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
      set({ devices });
    } catch (error) {
      console.error("Failed to load devices:", error);
    }
  },
}));