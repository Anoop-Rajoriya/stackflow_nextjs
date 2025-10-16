import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";

export type Store = AuthSlice;

const useStore = create<Store>()(
  persist(
    immer((...arg) => ({
      ...createAuthSlice(...arg),
    })),
    {
      name: "stackflow-app-store", // localStorage key
      partialize: (state) => ({
        // only persist what you need
        ...state,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

export default useStore;
