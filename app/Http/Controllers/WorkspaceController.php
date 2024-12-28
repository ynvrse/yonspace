<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\MemberWorkspaceResource;
use App\Http\Resources\WorkspaceResource;
use App\Models\Member;
use App\Models\User;
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
        $workspace->members()->create([
            'user_id' => $request->user()->id,
            'role' => $workspace->user_id == $request->user()->id ? 'Owner' : 'Member',
        ]);

        flashMessage('Workspace information saved succesfully');


        return to_route('workspaces.show', $workspace);
    }


    public function show(Workspace $workspace): Response
    {
        $members = $workspace->members()->get();

        return inertia('Workspaces/Show', props: [
            'workspace' => fn() => new WorkspaceResource($workspace->load('members')),
            'workspace_settings' => [
                'title' => 'Edit Workspace',
                'subtitle' => 'Fill out this form to edit workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace),
            ],
            'visibilities' => WorkspaceVisibility::options(),

            'member_dialog' => [
                'title' => 'Invite Members',
                'subtitle' => 'Fill out this form to invite a member to your workspace',
                'method' => 'POST',
                'action' => route('workspaces.member_store', $workspace)
            ]

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
    public function destroy(Workspace $workspace,): RedirectResponse
    {

        $this->delete_file($workspace, 'logo');
        $this->delete_file($workspace, 'cover');

        $workspace->members()->delete();
        $workspace->delete();
        flashMessage('Workspace successfuly deleted');
        return to_route('dashboard');
    }


    public function member_store(Workspace $workspace, Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'string', 'max:100']
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            flashMessage('Unregistered User.', 'error');
            return back();
        }

        if ($workspace->user_id === $user->id) {
            flashMessage('You cannot add yourself as a member of your own workspace.', 'error');
            return back();
        }

        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User is alredy a member of this workspace', 'error');
            return back();
        }

        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => 'Member',
        ]);
        flashMessage('Member succesfuly invited');
        return back();
    }
    public function member_destroy(Workspace $workspace, Member $member): RedirectResponse
    {

        $member->delete();

        flashMessage('Member succesfuly deleted');
        return back();
    }
}
