// // SortableTaskCard.jsx
// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import TaskCard from "./TaskCard.jsx";

// export default function SortableTaskCard({ task, onToggleStatus, onDelete }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: task._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <TaskCard task={task} onToggleStatus={onToggleStatus} onDelete={onDelete} />
//     </div>
//   );
// }
