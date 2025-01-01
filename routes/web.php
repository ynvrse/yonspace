<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\MemberCardController;
use App\Http\Controllers\AttachmentController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::controller(WorkspaceController::class)->group(function () {
    Route::get('workspaces/create', 'create')->name('workspaces.create');
    Route::post('', 'store')->name('workspaces.store');
    Route::get('workspaces/p/{workspace:slug}', 'show')->name('workspaces.show');
    Route::get('workspaces/edit/{workspace:slug}', 'edit')->name('workspaces.edit');
    Route::put('workspaces/edit/{workspace:slug}', 'update')->name('workspaces.update');
    Route::delete('workspaces/destroy/{workspace:slug}', 'destroy')->name('workspaces.destroy');

    Route::post('workspaces/member/{workspace:slug}/store', 'member_store')->name('workspaces.member_store');
    Route::delete('workspaces/member/{workspace}/destroy/{member}', 'member_destroy')->name('workspaces.member_destroy');
})->middleware('auth');

Route::prefix('cards/{workspace:slug}')->controller(CardController::class)->group(function () {
    Route::get('create', 'create')->name('cards.create');
    Route::post('create', 'store')->name('cards.store');
    Route::get('detail/{card}', 'show')->name('cards.show');
    Route::get('edit/{card}', 'edit')->name('cards.edit');
    Route::put('edit/{card}', 'update')->name('cards.update');
    Route::post('{card}/reorder', 'reorder')->name('cards.reorder');
    Route::delete('destroy/{card}', 'destroy')->name('cards.destroy');
});



Route::controller(AttachmentController::class)->group(function () {
    Route::post('cards/attachment/{card}/create', 'store')->name('attachments.store');
})->middleware('auth');


Route::controller(MemberCardController::class)->group(function () {
    Route::post('cards/member/{card}/store', 'store')->name('member_card.store');
    Route::delete('cards/member/{card}/destroy/{member}', 'destroy')->name('member_card.destroy');
})->middleware('auth');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
