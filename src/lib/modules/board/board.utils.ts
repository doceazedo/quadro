import interact from 'interactjs';
import { get } from 'svelte/store';
import { BOARD } from './board.store';
import { reorderCard } from './board.client';

export const makeDraggable = (el: HTMLElement, move: (event: any) => void) =>
  interact(el).draggable({
    autoScroll: true,
    listeners: { move },
  });

export const makeDropzone = (el: HTMLElement, resetPosition?: () => void) =>
  interact(el).dropzone({
    accept: '.draggable',
    overlap: 0.5,
    ondragenter: (event) => {
      const isSameDragzone = event.target.classList.contains('dragging');
      if (isSameDragzone) return;
      const box = event.relatedTarget.getBoundingClientRect();
      event.target.style.paddingTop = `${box.height}px`;
    },
    ondragleave: (event) => (event.target.style.paddingTop = null),
    ondrop: (event) => {
      event.target.style.paddingTop = null;

      const fromColumnId = parseInt(event.relatedTarget.dataset.columnId);
      const fromPosition = parseInt(event.relatedTarget.dataset.position);

      const toColumnId = parseInt(event.target.dataset.columnId);
      const toPosition = parseInt(event.target.dataset.position);

      updateCardPosition(fromColumnId, fromPosition, toColumnId, toPosition);
    },
    ondropdeactivate: resetPosition,
  });

const updateCardPosition = async (
  fromColumnId: number,
  fromPosition: number,
  toColumnId: number,
  toPosition: number,
) => {
  const boardData = get(BOARD);
  const columnIndex = boardData!.columns.findIndex((x) => x.id == fromColumnId);
  const movingCard = boardData!.columns[columnIndex]!.cards.splice(
    fromPosition,
    1,
  )[0];

  const toColumnIndex = boardData!.columns.findIndex((x) => x.id == toColumnId);
  boardData!.columns[toColumnIndex].cards.splice(toPosition, 0, {
    ...movingCard,
    columnId: toColumnId,
  });
  BOARD.set(boardData);

  const cards = [
    ...boardData!.columns[columnIndex].cards.map((x, i) => ({
      ...x,
      position: i,
    })),
    ...boardData!.columns[toColumnIndex].cards.map((x, i) => ({
      ...x,
      position: i,
    })),
  ];
  const cardChanges = {
    boardId: boardData!.id,
    cards: cards.map((x) => ({
      id: x.id,
      position: x.position,
      columnId: x.columnId,
    })),
  };

  await reorderCard(cardChanges);
};
