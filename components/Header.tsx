import { Menu, Activity, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                    <Activity className="h-4 w-4" />
                    <span className="sr-only">Activity</span>
                </Button>
                <Button variant="outline" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Help</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Preferences</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
