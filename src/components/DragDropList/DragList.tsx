import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import style from './DragDropList.module.scss';

const grid = 0;

const getItemStyle = (isDragging: any, draggableStyle: any) => {
  const horizontal: any = {};

  if (draggableStyle.transform) {
    const y = draggableStyle.transform.split(',')[1];
    horizontal.transform = `translate(0, ${y}`;
  }

  return {
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle,
    ...horizontal,
  };
};

const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type Props<T> = {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  getDragId: (item: T) => string;
  renderItem: (
    item: T,
    index: number,
    dragHandleProps: DraggableProvided['dragHandleProps'],
    isDragging: boolean,
  ) => React.ReactNode;
};

export const DragList = <T,>({ items, setItems, getDragId, renderItem }: Props<T>) => {
  const onDragEnd: OnDragEndResponder = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderItems = reorder(items, result.source.index, result.destination.index);

    setItems([...reorderItems]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={style.list}
            //style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable
                key={getDragId(item)}
                draggableId={getDragId(item)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    //{...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {renderItem(
                      item,
                      index,
                      provided.dragHandleProps,
                      snapshot.isDragging,
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
