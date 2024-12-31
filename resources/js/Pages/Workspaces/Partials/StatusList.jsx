import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import CardList from './CardList';

export default function StatusList({ status, cards, workspace, handleDeleteCard }) {
    const cardsIds = useMemo(() => {
        return cards.map((card) => card.id);
    }, [cards]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: status.value,
        data: {
            type: 'Status',
            status,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="min-h-[350px] w-full space-y-4 rounded-lg border shadow-md sm:w-1/4"
        >
            <div className="mt-2 flex items-center justify-between px-2">
                <span className="text-base font-semibold leading-relaxed tracking-tighter">{status.value}</span>
                <div className="flex items-center gap-x-3">
                    <Link
                        href={route('cards.create', {
                            workspace: workspace,
                            _query: {
                                status: status.value,
                            },
                        })}
                    >
                        <Plus size={14} />
                    </Link>
                </div>
            </div>
            {/* column card container */}
            <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
                <SortableContext items={cardsIds}>
                    {cards.map((card) => (
                        <CardList key={card.id} card={card} workspace={workspace} handleDeleteCard={handleDeleteCard} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
