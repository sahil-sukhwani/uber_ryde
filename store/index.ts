import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  city: null,
  postalCode: null,
  setUserLocation({ latitude, longitude, address }) {
    set((state) => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
      city: address.split(",")[0].trim(),
      postalCode: address.split(",")[1].trim(),
    }));
  },
  setDestinationLocation({ latitude, longitude, address }) {
    set((state) => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver(driverId: number) {
    set({ selectedDriver: driverId });
  },
  setDrivers(drivers: MarkerData[]) {
    set({ drivers });
  },
  clearSelectedDriver() {
    set({ selectedDriver: null });
  },
}));
