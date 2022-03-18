export interface IDistributionObject{
  nroAdultos:number,
  nroNinos:number,
  ninos: DistributionNinos[]

  addNino():void;
  deleteNino():void;
}

export interface DistributionNinos  {
  edad:number;
};

export class DistributionObject implements IDistributionObject{
  constructor(
    public nroAdultos: number = 0,
    public nroNinos: number = 0,
    public ninos: DistributionNinos[] = []
  ){}

  addNino(){

    const obj = {
      edad:0
    }

    this.ninos.push(obj);
    this.calculateNinos();
  }

  deleteNino(){
    this.ninos.splice(this.nroNinos - 1 ,1);
    this.calculateNinos();
  }

  private calculateNinos(){
    this.nroNinos = this.ninos.length;
  }
}

