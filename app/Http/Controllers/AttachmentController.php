<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Card;

class AttachmentController extends Controller
{
    use HasFile;

    public function store(Card $card, Request $request): RedirectResponse
    {
        $request->user()->attachments()->create([
            'card_id' => $card->id,
            'file' => $this->uploadFile($request, 'file', 'attachments'),
            'link' => $request->link,
            'name' => $request->name,

        ]);
        flashMessage("Attachment was save successfully");

        return back();
    }
}
