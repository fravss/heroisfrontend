import { Superpoderes } from "./superpoderes";

export interface Herois {
    id: number,
    nome: string,
    nomeHeroi: string,
    dataNascimento: string,
    peso: number,
    altura: number,
    superpoderes: Superpoderes[]
}