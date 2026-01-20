import { ContactDatasource } from "../../../domain/datasources";
import { AddContactDto, RemoveContactDto } from "../../../domain/dtos/contact.dto";
import { Contact } from "../../../domain/entities";

export class ContactDatasourcePostgres implements ContactDatasource {
    
    async addContact(data: AddContactDto): Promise<Contact> {
        throw new Error("Method not implemented.");
    }

    async removeContact(data: RemoveContactDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getContactsByUser(userId: number): Promise<Contact[]> {
        throw new Error("Method not implemented.");
    }

    async exists(userId: number, contactUserId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}