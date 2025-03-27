// import React, { useEffect } from "react";
// import { Footer } from "../components/Footer";
// import Sidebar from "../components/Sidebar";

// const AdminLayout = ({children, title}) => {
//     useEffect(() => {
//         if (title)
//         {
//             document.title = title;
//         }
//     }, [title]);

//     return (
//         <div className="tw-d-flex">
//           <Sidebar />
//           <div className="tw-flex-grow-1">
//             <Header />
//             <main className="tw-p-3">
//               {children}
//             </main>
//           </div>
//         </div>
//       );
//     };

// export default AdminLayout;

import React, { useEffect } from "react";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AdminLayout = () => {
    // useEffect(() => {
    //     if (title)
    //     {
    //         document.title = title;
    //     }
    // }, [title]);

    return (
        <div className="tw-flex tw-min-h-screen">
          <Sidebar />
        <div className="tw-flex-1">
          {/* <Header /> */}
          <main className="tw-flex-1 tw-p-3">
            <Outlet />
          </main>
        </div>
        </div>
      );
    };

export default AdminLayout;