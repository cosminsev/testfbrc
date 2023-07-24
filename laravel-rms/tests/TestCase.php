<?php

namespace Tests;

use App\Models\Movies;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();
        $this->withoutExceptionHandling();
    }

    /**
     * Create a new movie record in the database using the factory.
     *
     * @param array $args An optional array of attributes to override the default factory values.
     *
     * @return \App\Models\Movies Returns a new instance of Movies representing the created movie.
     */
    public function createMovie($args = [])
    {
        return Movies::factory()->create($args);
    }
}
