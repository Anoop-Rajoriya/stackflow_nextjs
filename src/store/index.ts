import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";

type Store = AuthSlice;

const useStore = create<Store>()(
  persist(
    immer((...arg) => ({ ...createAuthSlice(...arg) })),
    {
      name: "stackflow-app-store", // localStorage key
      partialize: (state) => ({
        // only persist what you need
        ...state,
      }),
    }
  )
);

export default useStore;
