<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class WorkspaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $members = $this->members()->get();

        $membersData = $members->map(function ($member) {
            return [
                'id' => $member->id,
                'memberable_id' => $member->memberable_id,
                'role' => $member->role,
                'name' => $member->user->name,
                'email' => $member->user->email,
                'avatar' => $member->user->avatar,
            ];
        });

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'logo' => Storage::url($this->logo),
            'cover' => Storage::url($this->cover),
            'visibility' => $this->visibility->value,
            'members' => $membersData,
        ];
    }
}
