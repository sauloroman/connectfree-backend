import { ContactDatasource } from "../../../domain/datasources"
import { AddContactDto, RemoveContactDto } from "../../../domain/dtos/contact.dto"
import { Contact } from "../../../domain/entities"
import { ContactRepository } from "../../../domain/repositories"

export class ContactRepositoryImpl implements ContactRepository {

    constructor(
        private readonly datasource: ContactDatasource
    ) { }

    async exists(userId: number, contactUserId: number): Promise<boolean> {
        return await this.datasource.exists(userId, contactUserId)
    }

    async add(data: AddContactDto): Promise<Contact> {
        return await this.datasource.addContact(data)
    }

    async remove(data: RemoveContactDto): Promise<void> {
        return await this.datasource.removeContact(data)
    }

    async list(userId: number): Promise<Contact[]> {
        return await this.datasource.getContactsByUser(userId)
    }
}
