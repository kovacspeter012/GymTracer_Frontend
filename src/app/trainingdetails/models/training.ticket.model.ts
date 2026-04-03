export type Ticket = {
  id: number;
  description: string;
  isStudent: boolean;
  type: string;
  price: number;
  tax_key: string;
  maxUsage: number;
  isActive: boolean;
}