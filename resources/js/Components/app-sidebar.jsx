import { AudioWaveform, Command, Frame, GalleryVerticalEnd, Home, ListTodo, Map, PieChart, User2 } from 'lucide-react';

import { NavMain } from '@/Components/nav-main';
import { NavWorkspaces } from '@/Components/nav-workspace';
import { NavUser } from '@/Components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import NavIcon from './nav-icon';

const  navMain = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
        isActive: true,
    },
    {
        title: 'People',
        url: '/users',
        icon: User2,
    },
    {
        title: 'My Task',
        url: '/task',
        icon: ListTodo,
    },
]

export function AppSidebar({ ...props }) {
    const user = usePage().props.auth.user;
    const workspaces = usePage().props.workspaces;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavIcon />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavWorkspaces workspaces={workspaces} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
