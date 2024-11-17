// import React, { createContext, useContext, useState } from 'react';

// // Create a context for the Toast
// const ToastContext = createContext();

// // Toast Provider Component
// export const toast = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

//   const addToast = (toast) => {
//     setToasts((prevToasts) => [...prevToasts, toast]);

//     // Automatically remove toast after 3 seconds
//     setTimeout(() => {
//       setToasts((prevToasts) => prevToasts.slice(1));
//     }, 3000);
//   };

//   return (
//     <ToastContext.Provider value={addToast}>
//       {children}
//       <div className="toast-container">
//         {toasts.map((toast, index) => (
//           <div
//             key={index}
//             className={`toast toast-${toast.variant || 'default'}`}
//           >
//             <strong>{toast.title}</strong>
//             {toast.description && <p>{toast.description}</p>}
//           </div>
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// };

// // Custom Hook to use the Toast
// export const useToast = () => {
//   return useContext(ToastContext);
// };
