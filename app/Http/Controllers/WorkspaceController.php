<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
use App\Traits\HasFile;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class WorkspaceController extends Controller
{
    use HasFile;


    public function create(): Response
    {
        return inertia('Workspaces/Create', props: [
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'Fill out this form to add a new workspace',
                'method' => 'POST',
                'action' => route('workspaces.store'),
            ],
            'visibilities' => WorkspaceVisibility::options(),
        ]);
    }


    public function store(WorkspaceRequest $request): RedirectResponse
    {

        $workspace = $request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name . str()->uuid(10)),
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'),
            'visibility' => $request->visibility,
        ]);
        flashMessage('Workspace information saved succesfully');
        return to_route('workspaces.show', $workspace);
    }


    public function show(Workspace $workspace): Response
    {
        return inertia('Workspaces/Show', props: [
            'workspace' => fn() => new WorkspaceResource($workspace),
        ]);
    }
}
