import { Folder, Forward, MoreHorizontal, Trash2 } from 'lucide-react';

import CreateWorkspace from '@/Components/FormDialog/CreateWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/Components/ui/sidebar';
import { getAvatarFallback, handleFlashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
export function NavWorkspaces({ workspaces }) {
    const { isMobile } = useSidebar();
    const { pathname } = window.location;
    const parts = pathname.split('/');
    const slug = parts[parts.length - 1];

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <div className="flex items-center justify-between">
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>

                <CreateWorkspace />
            </div>
            <SidebarMenu>
                {workspaces.map((item) => {
                    const isActive = slug === item.slug;
                    return (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton asChild isActive={isActive}>
                                <Link href={route('workspaces.show', item.slug)} >
                                    <Avatar className="h-7 w-7 rounded-sm">
                                        <AvatarImage src={item.logo} alt={item.name} />
                                        <AvatarFallback className="rounded-sm bg-lime-200 text-xs font-bold">
                                            {getAvatarFallback(item.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48 rounded-lg"
                                    side={isMobile ? 'bottom' : 'right'}
                                    align={isMobile ? 'end' : 'start'}
                                >
                                    <DropdownMenuItem>
                                        <Link href={route('workspaces.show', item.slug)} className='flex gap-x-2'>
                                        <Folder size={16} className="text-muted-foreground" />
                                        <span>View Workspace</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Forward className="text-muted-foreground" />
                                        <span>Share Workspace</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                    onClick={() =>
                                        router.delete(
                                            route('workspaces.destroy', {
                                                workspace: item.slug,

                                            }),
                                            {
                                                ...handleFlashMessage(), 
                                                preserveScroll: true,
                                                preserveState: true,
                                            },
                                        )
                                    }
                                    >
                                        <Trash2 className="text-muted-foreground" />
                                        <span>Delete Workspace</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    );
                })}

                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
