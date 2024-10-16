import { createReducer, on } from '@ngrx/store';
import { BingoModel, PokemonInBiomeModel, PokemonModel } from '../bingo/models/bingoData.model';
import { loadBingoData, removeBingoData, togglePokemonCheck } from '../actions/bingo.action';

export const initialState: BingoModel = {
    data: [],
    pokeBingo: [],
    count: 0,
};

export const bingoReducer = createReducer(
    initialState,
    on(loadBingoData, (state, { pokeBingo, count, data }) => {
        // Ajoute le champ 'checked' à chaque Pokémon lors du chargement des données
        const newPokeBingoData: PokemonModel[] = pokeBingo.map(pokemon => ({
            ...pokemon,
            checked: false // Initialise la propriété 'checked' à false
        }));

        const newDataBiome: PokemonInBiomeModel[] = data.map(biome => ({
            ...biome, pokeList:
                biome.pokeList.map(pokemon => ({
                    ...pokemon,
                    checked: false // Initialise la propriété 'checked' à false
                }))
        }
        ));

        return {
            ...state,
            pokeBingo: newPokeBingoData,
            count,
            data: newDataBiome
        };
    }),
    on(removeBingoData, (state) => ({
        ...state,
        data: [],
        count: 0,
        pokeBingo: []
    })),
    on(togglePokemonCheck, (state, { pokemonId }) => {
        const updatedPokeBingo = state.pokeBingo.map(pokemon => {
            if (pokemon.id === pokemonId) {
                return { ...pokemon, checked: !pokemon.checked };
            }
            return pokemon;
        });
        const updatedPokeInBiome = state.data.map(biome => ({
            ...biome,
            pokeList: biome.pokeList.map(pokemon => {
                if (pokemon.id === pokemonId) {
                    return { ...pokemon, checked: !pokemon.checked };
                }
                return pokemon;
            })
        }));
        return { ...state, pokeBingo: updatedPokeBingo, data: updatedPokeInBiome };
    }),
)
