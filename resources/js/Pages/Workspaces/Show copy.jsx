import EditWorkspace from '@/Components/FormDialog/EditWorkspace';
import MemberWorkspace from '@/Components/FormDialog/MemberWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { getAvatarFallback, handleFlashMessage } from '@/lib/utils';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Link, router } from '@inertiajs/react';
import { Settings, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import CardList from './Partials/CardList';
import StatusList from './Partials/StatusList';

export default function Show({ ...props }) {
    const { workspace, workspace_settings, card, visibilities, member_dialog } = props;

    const [statuses, setStatuses] = useState(props.statuses);

    const statusesId = useMemo(() => statuses.map((status) => status.value), [statuses]);
    const [cards, setCards] = useState(props.cards);

    const [activeStatus, setActiveStatus] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    const handleDeleteCard = (id) => {
        const flashMessageHandlers = handleFlashMessage();

        router.delete(
            route('cards.destroy', {
                workspace: workspace.slug,
                card: id,
            }),
            flashMessageHandlers,
        );
        const newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
    };

    const handleDataCard = (current) => {
        return {
            type: current.type,
            data: current.type === 'Card' ? current.card.id : current.status.value,
        };
    };

    const handleReorderCard = (active, over) => {
        const currentCardId = active.data.current.card.id;

        const flashMessageHandlers = handleFlashMessage();

        router.post(
            route('cards.reorder', {
                workspace: workspace,
                card: currentCardId,
            }),
            {
                cardActive: handleDataCard(active.data.current),
                cardOver: handleDataCard(over.data.current),
            },
            flashMessageHandlers, // Tambahkan opsi flash message di sini
        );
    };

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    };

    const sensors = useSensors(
        useSensor(isMobileDevice() ? TouchSensor : PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const onDragStart = (event) => {
        if (event.active.data.current?.type === 'Card') {
            setActiveCard(event.active.data.current.card);
        }
    };

    const onDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const isActiveACard = active.data.current?.type === 'Card';
        const isOverACard = over.data.current?.type === 'Card';
        const isOverAStatus = over.data.current?.type === 'Status';

        if (isActiveACard) {
            setCards((prevCards) => {
                const activeIndex = prevCards.findIndex((card) => card.id === activeId);
                const activeCard = prevCards[activeIndex];

                if (activeId === overId) {
                    return prevCards;
                }

                if (isOverACard) {
                    const overIndex = prevCards.findIndex((card) => card.id === overId);
                    const overCard = prevCards[overIndex];

                    if (activeIndex === overIndex) {
                        return prevCards;
                    }

                    const newCards = [...prevCards];
                    newCards.splice(activeIndex, 1);
                    newCards.splice(overIndex, 0, activeCard);

                    return newCards;
                }

                if (isOverAStatus) {
                    const newStatus = overId;
                    if (activeCard.status === newStatus) {
                        return prevCards;
                    }

                    const newCards = prevCards.map((card) =>
                        card.id === activeId ? { ...card, status: newStatus } : card,
                    );

                    return newCards;
                }

                return prevCards;
            });
        }
    };

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const isActiveACard = active.data.current?.type === 'Card';
        const isOverACard = over.data.current?.type === 'Card';
        const isOverAStatus = over.data.current?.type === 'Status';

        if (isActiveACard && (isOverACard || isOverAStatus)) {
            if (activeId !== overId) {
                handleReorderCard(active, over);
            }
        }
        // handleReorderCard(active, over);

        setActiveCard(null);
    };

    return (
        <>
            <div>
                <img
                    src={workspace.cover}
                    alt={'cover-' + workspace.name}
                    className="h-32 w-full object-cover lg:h-48"
                />
            </div>

            <div className="px-2 sm:px-4">
                <div className="-mt-12 sm:items-center sm:space-x-5">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-x-3">
                            <Avatar className="h-24 w-24 rounded-full ring-4 ring-white">
                                <AvatarImage src={workspace.logo} alt={'logo-' + workspace.name} />
                                <AvatarFallback className="rounded-full">
                                    {getAvatarFallback(workspace.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block lg:block">
                                <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                    {workspace.name}
                                </CardTitle>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-4 md:mt-2">
                            <Link
                                href={route('cards.create', [workspace.slug])}
                                className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Create Card
                            </Link>

                            <MemberWorkspace
                                workspace={workspace.name}
                                member_dialog={member_dialog}
                                members={workspace.members}
                            >
                                <div className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <UsersRound size={18} />
                                </div>
                            </MemberWorkspace>

                            <EditWorkspace
                                workspace={workspace}
                                workspace_settings={workspace_settings}
                                visibilities={visibilities}
                            >
                                <div className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <Settings size={18} />
                                </div>
                            </EditWorkspace>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <CardTitle className="text-2xl leading-relaxed tracking-tighter">{workspace.name}</CardTitle>
                    </div>
                </div>
            </div>

            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div className="mt-2 flex min-h-[400px] w-full flex-col justify-start gap-x-5 gap-y-8 sm:flex-row">
                    <SortableContext items={statusesId}>
                        {statuses.map((status) => (
                            <StatusList
                                key={status.value}
                                status={status}
                                cards={cards.filter((card) => card.status === status.value)}
                                workspace={workspace}
                                handleDeleteCard={handleDeleteCard}
                            />
                        ))}
                    </SortableContext>
                </div>

                {createPortal(
                    activeStatus || activeCard ? (
                        <DragOverlay>
                            {activeStatus && (
                                <StatusList
                                    status={activeStatus}
                                    cards={cards.filter((card) => card.status === activeStatus.value)}
                                    workspace={workspace}
                                    handleDeleteCard={handleDeleteCard}
                                />
                            )}
                            {activeCard && <CardList card={activeCard} workspace={workspace} />}
                        </DragOverlay>
                    ) : null,
                    document.body,
                )}
            </DndContext>
        </>
    );
}

Show.layout = (page) => (
    <AppLayout children={page} headers={['Workspace', page.props.workspace.name]} title={page.props.workspace.name} />
);
