"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import MenuForm from "@/components/menu-form";
import MenuList from "@/components/menu-list";
import {
  addMenuRecursively,
  editMenuRecursively,
  deleteMenuRecursively,
} from "@/utils/menu-utils";

export default function Menu() {
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);

  const handleEditMenu = useCallback((menu) => {
    setMenuList((prevMenuList) => editMenuRecursively(prevMenuList, menu));
  }, []);

  const handleAddMenu = useCallback(
    ({ menu, parentId = null }) => {
      if (menu.id) {
        handleEditMenu(menu);
        return;
      }

      const newMenu = {
        ...menu,
        id: uuidv4(),
      };

      setMenuList((prevMenus) =>
        parentId
          ? addMenuRecursively(prevMenus, parentId, newMenu)
          : [...prevMenus, newMenu]
      );
    },
    [handleEditMenu]
  );

  const handleDeleteMenu = useCallback(
    (id) => {
      setMenuList(deleteMenuRecursively(menuList, id));
    },
    [menuList]
  );

  const handleCancelCreate = useCallback(() => router.push("/"), [router]);

  return (
    <div>
      {!menuList.length && (
        <div className="my-6 mx-4">
          <MenuForm
            onAddMenu={(menu) => handleAddMenu({ menu })}
            onDeleteMenu={handleCancelCreate}
            onCancelMenu={handleCancelCreate}
          />
        </div>
      )}
      {menuList.length > 0 && (
        <MenuList
          menuList={menuList}
          onAddMenu={handleAddMenu}
          onDeleteMenu={handleDeleteMenu}
          onReorderList={(reoderedList) => setMenuList(reoderedList)}
        />
      )}
    </div>
  );
}
