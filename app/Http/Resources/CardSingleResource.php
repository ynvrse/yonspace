<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'workspace_id' => $this->workspace_id,
            'title' => $this->title,
            'description' => $this->description,
            'deadline' => $this->deadline
                ? [
                    'format' => Carbon::parse($this->deadline)->format('d M Y'),
                    'unformated' => $this->deadline,
                ]
                : null,
            'status' => $this->status?->value ?? null,
            'priority' => $this->priority,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
