import {ticketsModel} from "./models/tickets.model.js"

export class TicketManagerMongo{
    constructor(){
        this.model=ticketsModel;
    };

    async createTickets(ticketInfo){
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            console.log("createcreateTickets",error.message);
            throw new Error("No se pudo crear el ticket");
        }
    };

}