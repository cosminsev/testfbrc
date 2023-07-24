<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'release_year' => $this->release_year,
            'imdb_id' => $this->imdb_id,
            'images' => $this->images,
            'omdb_data' => $this->omdb_data,
        ];
    }
}
