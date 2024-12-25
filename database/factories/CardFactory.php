<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Card;
use App\Models\User;
use App\Models\Workspace;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'workspace_id' => Workspace::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->text(),
            'deadline' => $this->faker->date(),
            'order' => $this->faker->numberBetween(-10000, 10000),
            'status' => $this->faker->word(),
            'priority' => $this->faker->word(),
        ];
    }
}
