import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { AuthStoreType, DataStoreType } from "./types/Store";

export const useDataStore = create<DataStoreType>()(
  persist<DataStoreType>(
    (set) => ({
      bucket: [],
      setProduct: (product) =>
        set((state) =>
          !state.bucket.find((p) => p.id === product.id)
            ? { bucket: [...state.bucket, product] }
            : state
        ),
      clearBucket: () => set(() => ({ bucket: [] })),
    }),
    { name: "store" }
  )
);

export const useAuthStore = create<AuthStoreType>()(
  persist<AuthStoreType>(
    (set) => ({
      user: {},
      login: (user) => set(() => ({ user })),
      logout: () => set(() => ({})),
    }),
    { name: "auth" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("store info", useDataStore);
  mountStoreDevtool("user info", useAuthStore);
}
