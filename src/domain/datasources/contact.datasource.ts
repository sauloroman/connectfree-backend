import { AddContactDto, RemoveContactDto } from "../dtos/contact.dto";
import { Contact } from "../entities";

export abstract class ContactDatasource {
    abstract addContact( data: AddContactDto ): Promise<Contact>
    abstract removeContact( data: RemoveContactDto ): Promise<void>
    abstract getContactsByUser( userId: number ): Promise<Contact[]>
    abstract exists( userId: number, contactUserId: number ): Promise<boolean>
}