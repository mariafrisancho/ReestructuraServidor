export class CreateContactDto{
    constructor(contactInfo){
        this.full_name = `${contactInfo.firts_name} ${contactInfo.last_name}`.toUpperCase(),
        this.first_name = contactInfo.firts_name,
        this.last_name = contactInfo.last_name,
        this.email = contactInfo.email
    }
}