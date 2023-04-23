import React, { useState } from "react";

const MenuTree = ({ data }) => {
  const [expanded, setExpanded] = useState([]);
  const [menuItems, setMenuItems] = useState(
    data.map((item, index) => {
      return { ...item, position: index };
    })
  );

  function handleItemMouseEnter(item) {
    setExpanded((prev) => [...prev, item.id]);
  }

  function handleItemMouseLeave(item) {
    setExpanded((prev) => prev.filter((id) => id !== item.id));
  }

  function handleDragStart(e, item) {
    e.stopPropagation();
    e.dataTransfer.setData("item", JSON.stringify(item));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, item) {
    e.stopPropagation();

    const droppedItem = JSON.parse(e.dataTransfer.getData("item"));

    if (droppedItem.parentId !== item.parentId) return;

    const updatedMenuItems = menuItems.map((i) => {
      if (i.id === droppedItem.id) {
        return { ...i, position: item ? item.position : null };
      } else if (i.id === item.id) {
        return { ...i, position: droppedItem.position };
      } else {
        return i;
      }
    });
    setMenuItems(updatedMenuItems);
  }

  function renderTree(menuArray, parentId = null) {
    const filteredItems = menuArray.filter(
      (item) => item.parentId === parentId
    );

    if (filteredItems.length === 0) {
      return null;
    }

    filteredItems.sort((a, b) => {
      if (a.position < b.position) return -1;

      if (a.position > b.position) return 1;

      return 0;
    });

    return (
      <ul className="menuTree" onDragOver={handleDragOver}>
        {filteredItems.map((item) => (
          <li
            className="menuTreeItem"
            key={item.id}
            onMouseEnter={() => handleItemMouseEnter(item)}
            onMouseLeave={() => handleItemMouseLeave(item)}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            draggable
          >
            <a href={item.url}>{item.label}</a>
            {expanded.includes(item.id) && renderTree(menuArray, item.id)}
          </li>
        ))}
      </ul>
    );
  }

  return <div className="navbar">{renderTree(menuItems)}</div>;
};

export default MenuTree;
