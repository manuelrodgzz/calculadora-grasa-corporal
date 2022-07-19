export interface PersonData {
    height: string;
    weight: string;
    waist: string;
    neck: string;
}

export interface MaleData extends PersonData {
    gender: 'male';
}

export interface FemaleData extends PersonData {
    gender: 'female';
    hip: string;
}
