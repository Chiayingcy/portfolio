<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PortfolioController extends Controller
{

    public function home()
    {
        return Inertia::render('Home');
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function prjects()
    {
        return Inertia::render('Projects');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function testt()
    {
        return Inertia::render('Testt');
    }
}
