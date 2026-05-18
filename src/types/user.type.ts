// enum type을 만드는 방법

// enum 키워드를 통해서 타입을 작성하는 방법이 지난 2년간 통용됨
// 이렇게0 만ㄴ든 Gender 타ㅓ입은 객체도 돼소 타입도 됨.
// 값으로 사용할 때는 GenderType.MALE
// 타입으로 사용할 땐  GenderType
// enum GenderType {
//     MALE= "MALE",
//     FEMALE = "FEMALE",
// }

export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
};

export type GenderTYpe = (typeof Gender)[keyof typeof Gender];
// typeof : 해당 타입을 반환
// keyof 키워드 : 해당 객체의 키를 반환

export const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
};
export type RoleType = (typeof Role)[keyof typeof Role];


export interface User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    name: string;
    nickname: string;
    email: string;
    phoneNumber: string | null;
    birthdate: Date | null;
    gender: GenderTYpe;
    role: RoleType;
}
