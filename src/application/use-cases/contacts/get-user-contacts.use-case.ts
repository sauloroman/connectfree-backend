import { Contact } from "../../../domain/entities";
import { ContactRepository } from "../../../domain/repositories";

export class GetUserContactsUseCase {

    constructor(private readonly contactRepository: ContactRepository ){}

    public async execute( userId: number ): Promise<Contact[]> {
        return await this.contactRepository.list(userId)
    }

}