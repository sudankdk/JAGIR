// export const Layout = ({ left: Left, right: Right }) => {
//   return (
//     <div className="flex h-screen">
//       {/* Left Pane - 25% Width */}
//       <div className="w-1/4 overflow-y-auto">
//         <Left />
//       </div>
//       {/* Right Pane - Remaining 75% Width */}
//       <div className="flex-1 overflow-y-auto">
//         <Right />
//       </div>
//     </div>
//   );
// };

export const Layout = ({ left, right }) => {
  return (
    <div className="flex h-screen">
      {/* Left Pane - 25% Width */}
      <div className="w-1/4 overflow-y-auto">{left}</div>
      {/* Right Pane - Remaining 75% Width */}
      <div className="flex-1 overflow-y-auto">{right}</div>
    </div>
  );
};
