export interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    passport: {
        middleName: string;
        gender: string;
        serialNumberPassport: string;
        passportIssuingDate: string;
        passportIssuingCountry: string;
    };
    email: string;
}