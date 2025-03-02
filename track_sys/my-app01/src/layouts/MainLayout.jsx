import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const MainLayout = ({children, title}) => {
    useEffect(() => {
        if (title)
        {
            document.title = title;
        }
    }, [title]);

    return (
        <div>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </div>

    );
};

export default MainLayout;