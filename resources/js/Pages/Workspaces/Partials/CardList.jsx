import ActionDialog from '@/Components/ActionDialog';
import GetPriorityBadge from '@/Components/GetPriorityBadge';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

import { Link } from '@inertiajs/react';
import { Edit, Ellipsis, Trash2 } from 'lucide-react';

export default function CardList({ card, workspace, handleDeleteCard }) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: card.id,
        data: {
            type: 'Card',
            card,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <Card
                ref={setNodeRef}
                style={style}
                className="relative flex h-[100px] min-h-[100px] cursor-grabbing items-center rounded-xl border border-dashed border-muted-foreground bg-gray-300 p-2.5 text-left opacity-30 animate-[shake_0.3s_ease-in-out_infinite]"
            ></Card>
        );
    }
    

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task relative  cursor-grab rounded-xl hover:ring-2 hover:ring-inset hover:ring-lime-400"
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-2 text-base leading-relaxed tracking-tighter">
                        <Link href={route('cards.show', [workspace, card])} className="hover:text-lime-500">
                            {card.title} 
                        </Link>
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-24">
                            <DropdownMenuItem asChild>
                                <Link href={route('cards.edit', [workspace, card])} className="cursor-pointer">
                                    <Edit /> Edit Card
                                </Link>
                            </DropdownMenuItem>
                            <ActionDialog
                                trigger={
                                    <DropdownMenuItem
                                        onSelect={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <Trash2 /> Delete Card
                                    </DropdownMenuItem>
                                }
                                title="Delete Card"
                                description="Are you sure you want to delete this card?"
                                action={() => handleDeleteCard(card.id)}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <GetPriorityBadge priority={card.priority} />
                </div>
                <CardDescription className="line-clamp-4 leading-relaxed tracking-tighter">
                    {card.description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
