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


    public function test(): RedirectResponse
    {
        flashMessage('hallo dunia');
        return back();
    }


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
                'action' => route('cards.update', [$workspace, $card]),
            ],
            'status' => request()->status ?? '',
            'statuses' => CardStatus::options(),
            'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
            'priorities' => CardPriority::options(),
            'workspace' => fn() => $workspace->only('slug', 'name'),
            'card' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),

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

        $card->members()->create([
            'user_id' => $request->user()->id,
            'role' => $card->user_id == $request->user()->id ? 'Owner' : 'Member'
        ]);


        flashMessage('Card information saved succesfully');

        return to_route('workspaces.show', [$workspace]);
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
        $last_status = $card->status->value;

        $card->update([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'order' => $this->ordering($workspace, $status),
            'priority' => $request->priority,
        ]);

        $this->adjustOrdering($workspace, $last_status);


        flashMessage('Succesfully save card information');


        return to_route('workspaces.show', [$workspace]);
    }

    public function destroy(Workspace $workspace, Card $card): RedirectResponse
    {
        $last_status = $card->status->value;

        $card->delete();

        $this->adjustOrdering($workspace, $last_status);

        flashMessage('The card has been successfuly deleted');
        return to_route('workspaces.show', [$workspace]);
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
    public function adjustOrdering(Workspace $workspace, string $status)
    {
        $order = 1;
        return Card::where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderBy('order')
            ->get()
            ->each(function ($card) use (&$order) {
                $card->order = $order;
                $card->save();
                $order++;
            });
    }


    public function reorder(Workspace $workspace, Card $card, Request $request): RedirectResponse
    {
        if ($request->cardActive['type'] === $request->cardOver['type']) {
            $active = Card::find($request->cardActive['data']);
            $over = Card::find($request->cardOver['data']);

            if ($active->status->value === $over->status->value) {
                $temp_order = $active->order;
                $active->order = $over->order;
                $over->order =  $temp_order;

                $active->save();
                $over->save();
            } else {
                $last_status_active = $active->status->value;
                $active->status = $over->status->value;
                $active->save();

                $this->adjustOrdering($workspace, $last_status_active);

                $this->adjustOrdering($workspace, $active->status->value);
            }
        } else {
            $active = Card::find($request->cardActive['data']);
            $last_status_active = $active->status->value;

            $active->status = $request->cardOver['data'];
            $active->order = $this->ordering($workspace, $request->cardOver['data']);
            $active->save();

            $this->adjustOrdering($workspace, $last_status_active);
        }

        flashMessage('Status has been updated to ' . $active->status->value);
        return to_route('workspaces.show', $workspace);
    }
}
