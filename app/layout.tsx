"use client";

import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* <Header /> */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
