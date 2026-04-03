import { TicketType } from "./training.ticklet.model";

export type Ticket = {
  id: number;
  description: string;
  isStudent: boolean;
  type: TicketType;
  price: number;
  tax_key: string;
  maxUsage: number;
  isActive: boolean;
}