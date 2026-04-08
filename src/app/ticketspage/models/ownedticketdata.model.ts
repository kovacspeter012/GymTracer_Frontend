import { TicketType } from "./tickettype.model";

export interface OwnedTicketData {
    type:           TicketType;
    description:    string;
    isStudent:      boolean;
    expirationDate: Date;
    usagesLeft:     number;
    trainingId:     null;
    trainingName:    null;
}

