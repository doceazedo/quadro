import { get, writable } from 'svelte/store';
import { USER } from '$lib/modules/auth';
import { setUserBoard } from './board.clients';
import type { Board, Card, Column } from '@prisma/client';

type ColumnWithCards = {
  cards: Card[];
} & Column;

type BoardResponse = {
  columns: ColumnWithCards[];
} & Board;

export const BOARD = writable<BoardResponse | null>(null, () => {
  const user = get(USER);
  setUserBoard(user!.id);
});
