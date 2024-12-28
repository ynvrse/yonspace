<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Enums\WorkspaceVisibility;
use App\Http\Resources\UserSingleResource;
use App\Http\Resources\WorksapceSidebarResource;
use App\Models\Workspace;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? new UserSingleResource($request->user()) : null,
            ],
            'workspaces' => fn() => $request->user()
                ? WorksapceSidebarResource::collection($this->getWorkspaceSidebar($request->user()))
                : null,
            'flash_message' => fn() => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'workspace_dialog' => fn() => $this->getWorkspaceDialog(),
            'visibilities' => fn() => WorkspaceVisibility::options(),
        ];
    }


    private function getWorkspaceDialog(): array
    {

        return [
            'title' => 'Create Workspace',
            'subtitle' => 'Fill out this form to add a new workspace',
            'method' => 'POST',
            'action' => route('workspaces.store'),
        ];
    }

    private function getWorkspaceSidebar($requestUser)
    {
        $sidebarShow = Workspace::where('user_id', $requestUser->id)
            ->orWhereHas(
                'members',
                fn($query) =>
                $query->where('user_id', $requestUser->id)
            )
            ->get();

        return $sidebarShow;
    }
}
