export interface ICardAutocomplete {
    id: string,
    codigo: string,
    country:string,
    title: string,
    children: ICardAutocomplete[],
    texto?: string | undefined
}