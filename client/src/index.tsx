import { create } from "zustand";
import { fetchDevices } from "./services/api";

interface SystemState {
  devices: { id: string; name: string; status: string }[];
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