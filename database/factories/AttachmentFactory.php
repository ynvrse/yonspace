<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Attachment;
use App\Models\Card;
use App\Models\User;

class AttachmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Attachment::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'card_id' => Card::factory(),
            'file' => $this->faker->word(),
            'link' => $this->faker->word(),
            'name' => $this->faker->name(),
        ];
    }
}
