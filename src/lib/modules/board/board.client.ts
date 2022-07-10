import { BOARD } from './board.store';

const baseUrl = '/api';

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
