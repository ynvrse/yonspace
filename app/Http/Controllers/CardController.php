<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardSingleResource;
use App\Models\Card;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CardController extends Controller
{


    public function create(Workspace $workspace): Response
    {
        return inertia('Cards/Create', [
            'page_settings' => [
                'title' => 'Create Card',
                'subtitle' => 'Fill out this form to add a new card',
                'method' => 'POST',
                'action' => route('cards.store', $workspace),
            ],
            'status' => request()->status ?? '',
            'statuses' => CardStatus::options(),
            'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
            'priorities' => CardPriority::options(),
            'workspace' => fn() => $workspace->only('slug', 'name'),
        ]);
    }

    public function edit(Workspace $workspace, Card $card): Response
    {

        return inertia('Cards/Edit', [
            'page_settings' => [
                'title' => 'Edit Card',
                'subtitle' => 'Fill out this form to edit this card',
                'method' => 'PUT',
                'action' => route('cards.update', $workspace, $card),
            ],
            'status' => request()->status ?? '',
            'statuses' => CardStatus::options(),
            'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
            'priorities' => CardPriority::options(),
            'workspace' => fn() => $workspace->only('slug', 'name'),
            'card' => $card,
        ]);
    }

    public function store(Workspace $workspace, CardRequest $request): RedirectResponse
    {

        $card = $request->user()->cards()->create([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'order' => $this->ordering($workspace, $status),
            'priority' => $request->priority,
        ]);


        flashMessage('Card information saved succesfully');
        return to_route('workspaces.show', [$workspace]);
        // return to_route('cards.edit', [$workspace->slug, $card]);
    }

    public function show(Workspace $workspace, Card $card): Response
    {
        return inertia('Cards/Show', [
            'cards' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
            'page_settings' => [
                'title' => 'Detail Card ' . $card->title,
                'subtitle' => 'You can see card information',
            ],

        ]);
    }

    public function update(Workspace $workspace, Card $card, CardRequest $request): RedirectResponse
    {


        $card->update([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'order' => $this->ordering($workspace, $status),
            'priority' => $request->priority,
        ]);


        flashMessage('Card information saved succesfully');
        return to_route('cards.edit', [$workspace->slug, $card->id]);
    }


    public function ordering(Workspace $workspace, string $status): int
    {
        $last_card = Card::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderByDesc('order')
            ->first();
        return $last_card ? $last_card->order + 1 : 1;
    }
}
