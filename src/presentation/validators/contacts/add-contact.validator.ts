export class AddContactValidator {

    public static validate( data: any ): [number?, string?] {

        if ( !data.contactUserId  ) {
            return [undefined, 'El id del contacto es obligatorio']
        }
        
        if ( data.contactUserId <= 0 ) {
            return [undefined, 'El id del contacto no es válido']
        }

        return [data.contactUserId]
    } 

}