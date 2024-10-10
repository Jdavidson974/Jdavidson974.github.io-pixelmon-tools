export class BingoModel {
    data!: [];
    pokeBingo!: PokemonModel[];
    count!: number;
}

export class PokemonModel {
    id!: number;
    name!: string;
    idDex?: number;
    imgUrl!: string;
}

export class PokemonInBiomeModel {
    name!: string;
    pokeList!: PokemonModel[];
    pokeNumber!: string;
}