export class GeneralResponse {
    Status: boolean;
    State: number;
    Message: string;

    constructor(){
        this.Status = false;
        this.State = 0;
        this.Message = '';
    }
  }
  
export class ResponseNumber extends GeneralResponse  {
    Value: number;
    Status:boolean;
    Message: string;

    constructor(){
        super();
        this.Value = 0;
        this.Status = false;
        this.Message = '';
    }
  }


