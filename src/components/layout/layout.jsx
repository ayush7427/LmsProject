import React from "react";
import { Header, Footer } from "../index";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
