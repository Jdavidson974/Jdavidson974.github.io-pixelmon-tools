import { createReducer, on } from '@ngrx/store';
import { BingoModel } from '../bingo/models/bingoData.model';
import { loadBingoData, removeBingoData } from '../actions/bingo.action';

export const initialState: BingoModel = {
    data: [],
    pokeBingo: [],
    count: 0,
};

export const bingoReducer = createReducer(
    initialState,
    on(loadBingoData, (state, { pokeBingo, count, data }) => ({ ...state, pokeBingo, count, data })), // Gère l'action pour mettre à jour le state

    on(removeBingoData, (state) => ({
        ...state,
        data: [],
        count: 0,
        pokeBingo: []
    }))
);
