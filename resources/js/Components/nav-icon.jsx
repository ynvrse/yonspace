import { Link } from '@inertiajs/react';

import { DropdownMenu, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/Components/ui/sidebar';

export default function NavIcon() {
    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Link href="/dashboard" className="flex items-center justify-center">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-lime-300 font-bold">
                                        YON
                                    </div>
                                    <div className="ml-1 text-3xl font-bold leading-relaxed tracking-tighter">
                                        space
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    );
}
