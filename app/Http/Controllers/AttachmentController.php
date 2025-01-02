<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Card;
use App\Traits\HasFile;
use App\Http\Requests\AttachmentRequest;

class AttachmentController extends Controller
{
    use HasFile;

    public function store(Card $card, AttachmentRequest $request): RedirectResponse
    {

        $request->user()->attachments()->create([
            'card_id' => $card->id,
            'file' => $this->upload_file($request, 'file', 'attachments'),
            'link' => $request->link,
            'name' => $request->name,

        ]);
        flashMessage("Attachment was save successfully");

        return back();
    }
}
