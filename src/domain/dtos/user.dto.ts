export interface CreateUserDto {
    username: string,
    email: string,
    password: string
}

export interface SearchUserDto {
    query: string,
    limit?: number
}