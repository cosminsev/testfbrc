<?php

namespace Tests\Feature;

use App\Models\Movies;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MoviesTest extends TestCase
{
    use RefreshDatabase;

    private $movie;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Test fetching all movies from the API.
     *
     * This function tests the API endpoint that fetches all movies from the database.
     *
     * @return void
     */
    public function test_fetch_all_movies()
    {
        // preparation
        $this->movie = $this->createMovie();

        // action
        $response = $this->getJson(route('movies.index'))->json('data');

        // assertion
        $this->assertGreaterThan(0, count($response));
        $this->assertEquals($this->movie->title, $response[0]['title']);
        $this->assertEquals($this->movie->release_year, $response[0]['release_year']);
        $this->assertEquals($this->movie->imdb_id, $response[0]['imdb_id']);
        $this->assertEquals($this->movie->images, $response[0]['images']);
    }


    public function test_fetch_single_movie()
    {
        // preparation
        $this->movie = $this->createMovie();

        // action
        $response = $this->getJson(route('movies.show', $this->movie->id))
            ->assertOk()
            ->json('data');

        // assertion
        $this->assertEquals($this->movie->title, $response['title']);
        $this->assertEquals($this->movie->release_year, $response['release_year']);
        $this->assertEquals($this->movie->imdb_id, $response['imdb_id']);
        $this->assertEquals($this->movie->images, $response['images']);
    }

    public function test_store_new_movie()
    {
        // preparation
        $movie = Movies::factory()->make();

        // action
        $response = $this->postJson(route('movies.store'), [
            'title' => $movie->title,
            'release_year' => $movie->release_year,
            'imdb_id' => $movie->imdb_id,
            'images' => $movie->images,
            'omdb_data' => $movie->omdb_data,
            ])
            ->assertCreated()
            ->json('data');

        // assertion
        $this->assertEquals($movie->title, $response['title']);
        $this->assertDatabaseHas('movies', ['title' => $movie->title]);
        $this->assertEquals($movie->release_year, $response['release_year']);
        $this->assertDatabaseHas('movies', ['release_year' => $movie->release_year]);
        $this->assertEquals($movie->imdb_id, $response['imdb_id']);
        $this->assertDatabaseHas('movies', ['imdb_id' => $movie->imdb_id]);
        
        // images JsonField assertion
        $this->assertEquals($movie->images, $response['images']);
        foreach($movie->images as $moviesimagesKey=>$moviesimagesUrl) {
            $this->assertDatabaseHas('movies', ['images->'.$moviesimagesKey => $moviesimagesUrl]);
        }

        // omdb_data JsonField assertion
        $this->assertEquals($movie->omdb_data, $response['omdb_data']);
        $this->assertDatabaseHas('movies', ['omdb_data->Title' => $movie->omdb_data['Title']]);

    }

    public function test_while_storing_movie_fields_are_required()
    {
        $this->withExceptionHandling();

        $this->postJson(route('movies.store'))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'release_year', 'imdb_id']);
    }

    public function test_delete_movie()
    {
        // preparation
        $this->movie = $this->createMovie();

        // action
        $this->deleteJson(route('movies.destroy', $this->movie->id))
            ->assertNoContent();

        // assertion
        $this->assertDatabaseMissing('movies', ['imdb_id' => $this->movie->imdb_id]);
    }

    public function test_update_movie()
    {

        // preparation
        $updatemovie = Movies::factory()->make();
        $this->movie = $this->createMovie();

        // action
        $this->putJson(route('movies.update', $this->movie->id), [
            'title' => $updatemovie->title,
            'release_year' => $updatemovie->release_year,
            'imdb_id' => $updatemovie->imdb_id,
            'images' => $updatemovie->images,
            'omdb_data' => $updatemovie->omdb_data,
        ])->assertOk();

        // assertion
        $this->assertDatabaseHas('movies', ['id' => $this->movie->id, 'title' => $updatemovie->title]);
        $this->assertDatabaseHas('movies', ['id' => $this->movie->id, 'release_year' => $updatemovie->release_year]);
        $this->assertDatabaseHas('movies', ['id' => $this->movie->id, 'imdb_id' => $updatemovie->imdb_id]);

        // images JsonField assertion
        foreach($updatemovie->images as $moviesimagesKey=>$moviesimagesUrl) {
            $this->assertDatabaseHas('movies', ['id' => $this->movie->id, 'images->'.$moviesimagesKey => $moviesimagesUrl]);
        }

        // omdb_data JsonField assertion
        $this->assertDatabaseHas('movies', ['id' => $this->movie->id, 'omdb_data->Title' => $updatemovie->omdb_data['Title']]);
    }

    public function test_while_updating_movie_fields_are_required()
    {
        // preparation
        $this->withExceptionHandling();
        $this->movie = $this->createMovie();

        // assertion
        $this->putJson(route('movies.update', $this->movie->id))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'release_year', 'imdb_id']);
    }

}
