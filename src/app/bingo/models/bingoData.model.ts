export class BingoModel {
    data!: PokemonInBiomeModel[];
    pokeBingo!: PokemonModel[];
    count!: number;
}

export class PokemonModel {
    id!: number;
    name!: string;
    idDex?: number;
    imgUrl!: string;
    checked!: boolean
}

export class PokemonInBiomeModel {
    name!: string;
    pokeList!: PokemonModel[];
    pokeNumber!: string;
    command !: string
}