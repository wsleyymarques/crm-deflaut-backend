export declare class UserDto {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
