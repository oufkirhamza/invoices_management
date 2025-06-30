<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('create-invoice', function () {
        return Inertia::render('createInvoice');
    })->name('createInvoice');
    Route::get('manage-invoices', function () {
        return Inertia::render('manageInvoices');
    })->name('manageInvoices');
    Route::get('clients', function () {
        return Inertia::render('clients');
    })->name('clients');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
