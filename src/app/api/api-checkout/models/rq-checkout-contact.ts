export interface RContact {
    result: ContactResult
    trackingCode: string
    state: State
  }
  
  export interface ContactResult {
    id: number
    fatherLastname: string
    firstname: string
    status: boolean
    email: string
  }
  
  export interface State {
    ok: boolean
  }
  