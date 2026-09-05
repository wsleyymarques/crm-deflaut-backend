export declare const ROLE_CODES: {
    readonly ADMIN: "admin";
    readonly MANAGER: "manager";
    readonly USER: "user";
};
export type RoleCode = (typeof ROLE_CODES)[keyof typeof ROLE_CODES];
