import { AddContactDto, RemoveContactDto } from "../dtos/contact.dto"
import { Contact } from "../entities"

export abstract class ContactRepository {
    abstract add( data: AddContactDto ): Promise<Contact>
    abstract remove( data: RemoveContactDto ): Promise<void>
    abstract list( userId: number ): Promise<Contact[]>
    abstract exists( userId: number, contactUserId: number ): Promise<boolean>
}
