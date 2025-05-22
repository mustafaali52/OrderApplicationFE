export interface User {
    Id: number
    UserName: string 
    PasswordHash: string 
    PasswordSalt: string
    Role: string
}