export interface State {
    Ok: boolean;
}

export interface ResponseModelT<T> {
    TrackingCode: string;
    State: State;    
    Result: T
}
