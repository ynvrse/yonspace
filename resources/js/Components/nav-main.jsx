'use client';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/Components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export function NavMain({ items }) {
    const { pathname } = window.location;
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                        <Link href={item.url} key={item.title}>
                            <SidebarMenuItem asChild>
                                <SidebarMenuButton isActive={isActive} variant="lime" tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    );
                })}
                <Link method="post" href={route('logout')} as="button" key="logout">
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Log Out">
                            <LogOut />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </Link>
            </SidebarMenu>
        </SidebarGroup>
    );
}
