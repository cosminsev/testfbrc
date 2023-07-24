<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class MoviesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $movieId = $this->route('movie');

        return [
            'title' => 'required|string|max:255',
            'release_year' => 'required|integer|digits:4|gt:1900',
            'imdb_id' => [
                'required',
                'string',
                'regex:/^tt\d{7,}$/',
                'max:20',
                Rule::unique('movies', 'imdb_id')->ignore($movieId),
            ],
            'images' => 'array',
            'omdb_data' => 'array',
        ];
    }

    /**
     * Get the validation error messages.
     *
     * @return array Returns an array of custom validation error messages.
     */
    public function messages()
    {
        return [
            'release_year.integer' => 'The :attribute must be a valid year (4-digit integer).',
            'release_year.digits' => 'The :attribute must be a 4-digit year.',
            'release_year.gt' => 'The :attribute must be greater than 1900.',
            'imdb_id.regex' => 'The :attribute format is invalid. It should be in the format "tt1234567".',
        ];
    }
    
}
