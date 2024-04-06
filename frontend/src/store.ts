import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { AuthStoreType, DataStoreType } from "./types/Store";
import { LoginResponse } from "./types/Auth";
import { OrderType } from "./types/Order";

export const useDataStore = create<DataStoreType>()(
  persist<DataStoreType>(
    (set) => ({
      bucket: [],

      setProduct: (product) =>
        set((state) =>
          !state.bucket.find((p) => p.product_id === product.product_id)
            ? { bucket: [...state.bucket, product] }
            : state
        ),
      removeProduct: (id) =>
        set((state) => ({ bucket: state.bucket.filter((p) => p.id !== id) })),
      updateProduct: (cart_id, product_id) =>
        set((state) => ({
          bucket: state.bucket.map((p) =>
            p.product_id === product_id ? { id: cart_id, ...p } : p
          ),
        })),
      clearBucket: () => set(() => ({ bucket: [] })),

      cart_id: "",
      setCartId: (id) => set(() => ({ cart_id: id })),
      clearCartId: () => set(() => ({ cart_id: "" })),

      order: {} as OrderType,
      setOrder: (order) => set(() => ({ order })),
    }),
    { name: "store" }
  )
);

export const useAuthStore = create<AuthStoreType>()(
  persist<AuthStoreType>(
    (set) => ({
      user: {} as LoginResponse,
      login: (user) => set(() => ({ user })),
      logout: () => set(() => ({ user: {} as LoginResponse })),

      phone_number: "",
      setPhoneNumber: (phone_number: string) => set(() => ({ phone_number })),
      clearPhoneNumber: () => set(() => ({ phone_number: "" })),
    }),
    { name: "auth" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("store info", useDataStore);
  mountStoreDevtool("user info", useAuthStore);
}
