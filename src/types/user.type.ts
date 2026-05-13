// enum type을 만드는 방법

// enum 키워드를 통해서 타입을 작성하는 방법이 지난 2년간 통용됨
// enum GenderType {
//     MALE= "MALE",
//     FEMALE = "FEMALE",
// }

export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE"
}

export type GenderTYpe = typeof Gender[keyof typeof Gender];
