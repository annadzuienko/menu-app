"use client";
import { useState, useCallback } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  closestCenter,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import dragIndicator from "@/public/dragIndicator.svg";
import MenuForm from "@/components/menu-form";

export default function MenuList({
  menuList,
  onAddMenu,
  onDeleteMenu,
  onReorderList,
}) {
  const sensors = useSensors(useSensor(MouseSensor));

  const [isMenuFormShow, setIsMenuFormShow] = useState(false);

  const reorderItems = useCallback((list, activeId, overId) => {
    const activeIndex = list.findIndex((item) => item.id === activeId);
    const overIndex = list.findIndex((item) => item.id === overId);

    if (activeIndex > -1 && overIndex > -1) {
      return arrayMove(list, activeIndex, overIndex);
    }

    return list.map((item) => ({
      ...item,
      children: reorderItems(item.children, activeId, overId),
    }));
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      onReorderList(reorderItems(menuList, active.id, over.id));
    },
    [menuList, onReorderList, reorderItems]
  );

  return (
    <div className="my-6 mx-4 border border-borderPrimary rounded-lg">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={menuList.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {menuList.map((item) => (
            <RecursiveItem
              key={item.id}
              item={item}
              onAddItem={(menu) => {
                setIsMenuFormShow(false);
                onAddMenu(menu);
              }}
              onDeleteItem={onDeleteMenu}
              cssClasses="border-b border-borderPrimary"
            />
          ))}
        </SortableContext>
      </DndContext>
      {isMenuFormShow && (
        <div className="bg-bgSecondary h-60+6 py-4 px-6">
          <MenuForm
            onAddMenu={(menu) => {
              setIsMenuFormShow(false);
              onAddMenu({ menu });
            }}
            onDeleteMenu={() => {
              setIsMenuFormShow(false), onDeleteMenu();
            }}
            onCancelMenu={() => setIsMenuFormShow(false)}
          />
        </div>
      )}
      <div className="flex items-center h-20 bg-bgPrimary rounded-b-lg">
        <button
          onClick={() => setIsMenuFormShow(true)}
          disabled={isMenuFormShow}
          className="my-2.5 mx-3.5 px-4 py-2 text-sm font-medium text-textSecondary bg-white border border-buttonSecondaryBorder rounded-lg  hover:bg-gray-100 disabled:bg-gray-100"
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}

const RecursiveItem = ({ item, onAddItem, onDeleteItem, cssClasses }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isSubMenuFormShow, setIsSubMenuFormShow] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);

  const clearState = () => {
    setIsSubMenuFormShow(false);
    setIsEditItem(false);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div>
        <div
          className={`flex items-center justify-between flex-wrap py-4 px-6 ${cssClasses}`}
        >
          <div {...attributes} {...listeners} className="flex items-center ">
            <div className="cursor-move text-gray-500">
              <Image
                src={dragIndicator}
                alt="Drag & Drop"
                className="cursor-move m-2.5"
              />
            </div>
            <div>
              <h3 className="text-textPrimary font-medium text-base">
                {item.text}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textTertiary text-sm underline"
              >
                {item.link}
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                onDeleteItem(item.id), clearState();
              }}
              className="px-4 py-2 text-sm font-medium text-textSecondary bg-white border border-r-0 border-buttonSecondaryBorder rounded-l-lg hover:bg-gray-100"
            >
              Usuń
            </button>
            <button
              onClick={() => setIsEditItem(true)}
              disabled={isSubMenuFormShow || isEditItem}
              className="px-4 py-2 text-sm font-medium text-textSecondary bg-white border border-buttonSecondaryBorder hover:bg-gray-100 disabled:bg-gray-100"
            >
              Edytuj
            </button>
            <button
              onClick={() => {
                setIsSubMenuFormShow(true);
              }}
              disabled={isSubMenuFormShow || isEditItem}
              className="px-4 py-2 text-sm font-medium text-textSecondary bg-white border border-l-0 border-buttonSecondaryBorder rounded-r-lg hover:bg-gray-100 disabled:bg-gray-100"
            >
              Dodaj pozycję menu
            </button>
          </div>
        </div>
        {isSubMenuFormShow && (
          <div className="bg-bgSecondary h-60+6 py-4 pr-6 pl-16">
            <MenuForm
              onAddMenu={(menu) => {
                onAddItem({ menu, parentId: item.id }), clearState();
              }}
              onDeleteMenu={clearState}
              onCancelMenu={clearState}
            />
          </div>
        )}
        {isEditItem && (
          <div className="bg-bgSecondary h-60+6 py-4 px-6">
            <MenuForm
              onAddMenu={(menu) => {
                onAddItem({ menu, parentId: item.id }), clearState();
              }}
              onDeleteMenu={() => {
                onDeleteItem(item.id), clearState();
              }}
              onCancelMenu={clearState}
              defaultValues={{ ...item }}
            />
          </div>
        )}
      </div>
      {item.children.length > 0 &&
        item.children.map((child) => (
          <div key={child.id} className="bg-bgSecondary">
            <div key={child.id} className="ml-16 bg-white ">
              <SortableContext
                items={item.children.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <RecursiveItem
                  key={child.id}
                  item={child}
                  onAddItem={onAddItem}
                  onDeleteItem={onDeleteItem}
                  cssClasses="border-b border-l border-borderPrimary rounded-bl-lg"
                />
              </SortableContext>
            </div>
          </div>
        ))}
    </div>
  );
};
