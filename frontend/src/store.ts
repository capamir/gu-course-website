import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { DataStoreType } from "./types/Store";

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

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("store info", useDataStore);
}
