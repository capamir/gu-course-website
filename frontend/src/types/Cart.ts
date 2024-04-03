export interface StoreCartItemType {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartType {
  id: string;
  items: CartItemType[] | [];
  total_price: number;
}

interface CartItemType {
  id: number;
  price: number;
  product: ProductType;
}

interface ProductType {
  id: number;
  title: string;
  price: number;
}

export interface AddCartItemType {
  id?: number;
  product_id: number;
}
