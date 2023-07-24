<?php

namespace App\Http\Controllers;

use App\Http\Requests\MoviesRequest;
use App\Http\Resources\MoviesResource;
use App\Models\Movies;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    /**
     * Retrieve a list of all movies.
     *
     * @return \App\Http\Resources\MoviesResource which represents a list of all movies.
     */
    public function index(Request $request)
    {
        // Retrieve the page_size query parameter (default to 15 if not provided)
        $page_size = $request->query('page_size', 15);

        // Retrieve the search query parameter (default to null if not provided)
        $search = $request->query('search');

        // Apply search filter if the search query parameter is provided
        $query = Movies::query();
        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%");
        }

        // Paginate the results based on the page_size query parameter
        $movies = $query->paginate($page_size);

        return MoviesResource::collection($movies);
    }

    /**
     * Store a new movie record in the database.
     *
     * @param \App\Http\Requests\MoviesRequest $request The validated MoviesRequest object containing the data for creating a new movie.
     *
     * @return \App\Http\Resources\MoviesResource Returns a new instance of MoviesResource, which represents the newly created movie.
     */
    public function store(MoviesRequest $request)
    {
        $data = $request->validated();
        $movie = Movies::create($data);
        return new MoviesResource($movie);
    }

    /**
     * Display the specified movie.
     *
     * @param \App\Models\Movies $movie The Movies model instance representing the movie to be fetched.
     *
     * @return \App\Http\Resources\MoviesResource Returns a new instance of MoviesResource, which represents the fetched movie.
     */
    public function show(Movies $movie)
    {
        return new MoviesResource($movie);
    }

    /**
     * Update the specified movie record in the database.
     *
     * @param \App\Http\Requests\MoviesRequest $request The validated MoviesRequest object containing the data for updating the movie.
     * @param \App\Models\Movies $movie The Movies model instance representing the movie to be updated.
     *
     * @return \App\Http\Resources\MoviesResource Returns a new instance of MoviesResource, which represents the updated movie.
     */
    public function update(MoviesRequest $request, Movies $movie)
    {
        $data = $request->validated();
        $movie->update($data);
        return new MoviesResource($movie);
    }

    /**
     * Remove the specified movie record from the database.
     *
     * @param \App\Models\Movies $movie The Movies model instance representing the movie to be deleted.
     *
     * @return \Illuminate\Http\Response Returns an empty response with status code 204 No Content to indicate successful deletion.
     */
    public function destroy(Movies $movie)
    {
        $movie->delete();
        return response('', Response::HTTP_NO_CONTENT);
    }
}
