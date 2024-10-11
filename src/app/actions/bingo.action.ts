import { createAction, props } from "@ngrx/store";
import { PokemonModel } from "../bingo/models/bingoData.model";

export const loadBingoData = createAction(
    '[Bingo] Load Bingo Data',
    props<{ pokeBingo: PokemonModel[], count: number }>() // Met à jour l'action pour inclure pokeBingo et count
);

export const removeBingoData = createAction('[Bingo] Remove Bingo Data');