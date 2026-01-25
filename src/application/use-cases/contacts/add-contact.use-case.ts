import { AddContactDto } from "../../../domain/dtos/contact.dto";
import { Contact } from "../../../domain/entities";
import { ContactRepository } from "../../../domain/repositories";

export class AddContactUseCase {

    constructor( 
        private readonly contactRepository: ContactRepository,
    ){}

    public async execute( data: AddContactDto ): Promise<Contact> {

        const { userId, contactUserId } = data        

        if ( userId === contactUserId ) {
            throw new Error('No te puedes agregar a ti mismo como contacto')
        }

        const contact = await this.contactRepository.add(data)

        return contact
    }

}