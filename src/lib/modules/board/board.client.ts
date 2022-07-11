import { BOARD } from './board.store';
import type { CardChanges } from '../../../routes/api/cards/reorder';

const baseUrl = '/api';

type CardRequest = {
  title: string;
  columnId: number;
};

export const setUserBoard = async (ownerId: number) => {
  try {
    const resp = await fetch(`${baseUrl}/users/${ownerId}/board`);
    const data = await resp.json();
    if (resp.ok) BOARD.set(data);
  } catch (error) {
    return null;
  }
};

export const createColumn = async (boardId: number) => {
  try {
    const resp = await fetch(`${baseUrl}/columns`, {
      method: 'post',
      body: JSON.stringify({ title: 'New column', boardId }),
    });
    const data = await resp.json();
    if (resp.ok) BOARD.set(data);
  } catch (error) {
    return null;
  }
};

export const createCard = async (req: CardRequest) => {
  try {
    const resp = await fetch(`${baseUrl}/cards`, {
      method: 'post',
      body: JSON.stringify(req),
    });
    const data = await resp.json();
    if (resp.ok) BOARD.set(data);
  } catch (error) {
    return null;
  }
};

export const reorderCard = async (cardChanges: CardChanges) => {
  try {
    const resp = await fetch(`${baseUrl}/cards/reorder`, {
      method: 'post',
      body: JSON.stringify(cardChanges),
    });
    const data = await resp.json();
    if (resp.ok) BOARD.set(data);
  } catch (error) {
    return null;
  }
};

export const updateColumn = async (id: number, title: string) => {
  try {
    const resp = await fetch(`${baseUrl}/columns/${id}`, {
      method: 'put',
      body: JSON.stringify({ title }),
    });
    const data = await resp.json();
    if (resp.ok) BOARD.set(data);
  } catch (error) {
    return null;
  }
};
