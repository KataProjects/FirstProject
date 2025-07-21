import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { type ReactNode, useCallback, useState } from 'react';

interface DndProviderProps<T extends { id: string | number }> {
  initialItems: T[];
  children: (items: T[], handleDragEnd: (event: DragEndEvent) => void) => ReactNode;
}

export const DndProvider = <T extends { id: string | number }>({
  initialItems,
  children,
}: DndProviderProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {children(items, handleDragEnd)}
      </SortableContext>
    </DndContext>
  );
};
