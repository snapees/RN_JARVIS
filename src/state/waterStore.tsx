import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';
import {displayNotification} from '../notification/notificationInitial';

interface WaterStore {
  waterDrinkStamps: string[];
  addWaterIntake: (timestamp: string) => void;
  resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],
      addWaterIntake: timeStamp => {
        const waterDrinkStamps = [...get().waterDrinkStamps, timeStamp];
        set({waterDrinkStamps});
        displayNotification(
          `Water Intake ${waterDrinkStamps.length}/8`,
          'Stay Hydrated 💧',
          require('../assets/images/water.png'),
          'water-intake',
        );
      },
      resetWaterIntake: () => {
        set({waterDrinkStamps: []});
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
