export interface OrderType {
  cart_id?: string;
  id?: number;
  customer?: number;
  placed_at?: string;
  payment_status?: string;
  items?: OrderItemType[];
}

interface OrderItemType {
  id: number;
  price: number;
  product: SimpleProductType;
}

interface SimpleProductType {
  id: number;
  title: string;
  price: number;
}
