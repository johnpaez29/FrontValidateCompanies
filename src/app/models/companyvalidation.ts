export interface CompanyValidator {
    Id : number;
    Nit : number;
    isValid : boolean;
    reason : string;
    code : string
}