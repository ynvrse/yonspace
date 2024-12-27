import { AudioWaveform, Command, Frame, GalleryVerticalEnd, Home, ListTodo, Map, PieChart, User2 } from 'lucide-react';

import { NavMain } from '@/Components/nav-main';
import { NavProjects } from '@/Components/nav-projects';
import { NavUser } from '@/Components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import NavIcon from './nav-icon';

const data = {
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
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
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }) {
    const user = usePage().props.auth.user;
    const workspaces = usePage().props.workspaces;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavIcon />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={workspaces} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
