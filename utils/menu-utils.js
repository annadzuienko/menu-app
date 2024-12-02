export function addMenuRecursively(list, parentId, menu) {
  return list.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...item.children, menu] };
    }
    if (item.children.length) {
      return {
        ...item,
        children: addMenuRecursively(item.children, parentId, menu),
      };
    }
    return item;
  });
}

export function editMenuRecursively(list, updates) {
  return list.map((item) => {
    if (item.id === updates.id) {
      return { ...item, ...updates };
    }
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: editMenuRecursively(item.children, updates),
      };
    }
    return item;
  });
}

export function deleteMenuRecursively(list, id) {
  return list
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: deleteMenuRecursively(item.children, id),
    }));
}
