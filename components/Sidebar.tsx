"use client";

import { usePathname } from "next/navigation";
import { LineChart, XCircle } from "lucide-react";
import Link from "next/link";

const navItems = [
    { href: "/", label: "Main Dashboard", icon: LineChart },
    {
        href: "/cancellation-prediction",
        label: "Cancellation Prediction",
        icon: XCircle,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Analytics Dashboard
                </h2>
            </div>
            <nav className="mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            pathname === item.href
                                ? "bg-gray-200 dark:bg-gray-700 text-primary"
                                : ""
                        }`}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
