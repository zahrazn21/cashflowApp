// import React, { useState, useRef, MouseEvent } from "react";

// export default function Test() {
//   const [size, setSize] = useState<{ width: number; height: number }>({
//     width: 300,
//     height: 200,
//   });

//   const boxRef = useRef<HTMLDivElement | null>(null);
//   const isResizing = useRef<boolean>(false);

//   const startResize = (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     isResizing.current = true;

//     const startX = e.clientX;
//     const startY = e.clientY;
//     const startWidth = size.width;
//     const startHeight = size.height;

//     const onMouseMove = (e: globalThis.MouseEvent) => {
//       if (!isResizing.current) return;

//       const newWidth = Math.max(150, startWidth + (e.clientX - startX));
//       const newHeight = Math.max(100, startHeight + (e.clientY - startY));

//       setSize({ width: newWidth, height: newHeight });
//     };

//     const onMouseUp = () => {
//       isResizing.current = false;
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//   };

//   return (
//     <div
//       ref={boxRef}
//       className="relative bg-white shadow-lg border rounded-lg p-4"
//       style={{ width: size.width, height: size.height }}
//     >
//       <p>این یک باکس کشویی است</p>
//       <div
//         onMouseDown={startResize}
//         className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize rounded-tr-lg"
//       />
//     </div>
//   );
// }
import { useRef, useState } from "react";

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = startYRef.current - currentY;

    // اگر از پایین به بالا کشید
    if (diff > 50) {
      setIsOpen(true);
    }
    // اگر از بالا به پایین کشید
    if (diff < -50) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* محتوای صفحه */}
      <div className="h-full absolute right-[50%] bg-gray-100">صفحه اصلی</div>

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-50 left-0 right-0 bg-white shadow-xl rounded-t-2xl p-4 transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "300px" }}
      >
        <div className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-4" />
        <p>محتوای باکس کشویی</p>
      </div>
    </div>
  );
}
