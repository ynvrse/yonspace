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
            'workspace_settings' => [
                'title' => 'Edit Workspace',
                'subtitle' => 'Fill out this form to edit workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace),
            ],
            'visibilities' => WorkspaceVisibility::options(),

        ]);
    }

    public function update(Workspace $workspace, WorkspaceRequest $request): RedirectResponse
    {

        $workspace->update([
            'name' => $name = $request->name,
            'slug' => str()->slug($name . str()->uuid(10)),
            'logo' =>  $request->hasFile('logo') ? $this->update_file($request, $workspace, 'logo', 'workspaces/logo') : $workspace->logo,
            'cover' =>  $request->hasFile('cover') ? $this->update_file($request, $workspace, 'cover', 'workspaces/cover') : $workspace->cover,

            'visibility' => $request->visibility,
        ]);
        flashMessage('Succesfully updated workspace');
        return to_route('workspaces.show', $workspace);
    }
}
