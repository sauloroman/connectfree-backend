import { RemoveContactDto } from "../../../domain/dtos/contact.dto";
import { ContactRepository } from "../../../domain/repositories";

export class RemoveContactUseCase {

    constructor(private readonly contactRepository: ContactRepository){}

    public async execute( data: RemoveContactDto ): Promise<void> {
        const exists = await this.contactRepository.exists(data.userId, data.contactUserId)
        if ( !exists ) throw new Error('La relación de contactos no existe')

        await this.contactRepository.remove( data )
    }

}