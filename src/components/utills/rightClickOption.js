import React, { useState, useEffect, useRef } from "react";

const RightClickOptionContainer = ({ children, rightClickOptions }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    console.log("right clicked from: ", x, y);
    setMenuPosition({ x, y });
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} onContextMenu={handleContextMenu} className="relative">
      {children}
      {menuVisible && (
        <div
          className="absolute bg-white border border-gray-300 rounded shadow-lg z-50"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
          {rightClickOptions.map(({optionName,onClickOption}, index) => (
            <div
              key={index}
              onClick={() => onClickOption()}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {optionName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightClickOptionContainer;
