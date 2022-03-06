export interface ICardAutocomplete {
    id: string,
    codigo: string,
    title: string,
    children: ICardAutocomplete[],
    texto?: string | undefined
}