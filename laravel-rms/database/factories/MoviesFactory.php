<?php

namespace Database\Factories;

use App\Models\Movies;
use Illuminate\Database\Eloquent\Factories\Factory;

class MoviesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Movies::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'release_year' => $this->faker->numberBetween(1900, date('Y')),
            'imdb_id' => 'tt' . $this->faker->unique()->numberBetween(1000000, 9999999),
            'images' => $this->MakeImagesJson(),
            'omdb_data' => $this->MakeOmdbDataJson(),
        ];
        
    }

    /**
     * MakeImagesJson function - returns a random generated array 1 to 5 key => value pairs
     *
     * @return array
     */
    protected function MakeImagesJson()
    {
        $imagesJson = [];
        for ($i = 0; $i < rand(1, 5); $i++) {
            $imagesJson = $imagesJson + [$this->faker->word . 'Image'  => $this->faker->imageUrl];
        }
        return $imagesJson;
    }

    /**
     * MakeImagesJson function - returns a part of OMDB object random generated as array
     *
     * @return array
     */
    protected function MakeOmdbDataJson()
    {
        return [
            "Title" => $this->faker->sentence,
            "Year" => $this->faker->numberBetween(1900, date('Y')),
            "Rated" => $this->faker->word,
            "Released" => $this->faker->date,
            "Runtime" => $this->faker->numberBetween(40, 300)." min",
            "Genre" => $this->faker->sentence,
            "Director" => $this->faker->name,
            "Writer" => $this->faker->name,
            "Actors" => $this->faker->sentence,
            "Plot" => $this->faker->paragraph,
            'imdbID' => 'tt' . $this->faker->randomNumber(7),
            'images' => [
                'quisImage' => $this->faker->imageUrl,
                'praesentiumImage' => $this->faker->imageUrl,
                'nullaImage' => $this->faker->imageUrl,
                'autImage' => $this->faker->imageUrl,
            ],
        ];
    }
}
