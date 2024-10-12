import { createAction, props } from "@ngrx/store";
import { BingoModel } from "../bingo/models/bingoData.model";

export const loadBingoData = createAction(
    '[Bingo] Load Bingo Data',
    props<BingoModel>() // Met à jour l'action pour inclure pokeBingo et count
);

export const removeBingoData = createAction('[Bingo] Remove Bingo Data');