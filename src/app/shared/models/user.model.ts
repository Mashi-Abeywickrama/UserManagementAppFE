export interface BaseEntity {
    createdAt: string;
    modifiedAt: string;
}

export interface Role extends BaseEntity {
    roleID: number;
    roleName: string;
}

export interface Status extends BaseEntity {
    statusID: number;
    statusName: string;
}

export interface User extends BaseEntity {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    roleType: number;
    status: number;
    role: Role;
    statusObj: Status;
}