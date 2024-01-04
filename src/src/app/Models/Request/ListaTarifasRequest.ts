import { SignatureModel } from "./SignatureModel";

export class ListaTarifaRequest{
    Signature : SignatureModel;
    IdWeb: number;
    IdLang: number

    constructor (){
        this.IdWeb = 0;
        this.IdLang = 0;
        this.Signature = new SignatureModel();
    }

}