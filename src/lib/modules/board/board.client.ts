import { BOARD } from './board.store';

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
