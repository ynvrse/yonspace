<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Card;
use App\Models\Task;
use App\Models\User;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'card_id' => Card::factory(),
            'user_id' => User::factory(),
            'parent_id' => $this->faker->numberBetween(-100000, 100000),
            'title' => $this->faker->sentence(4),
            'is_completed' => $this->faker->boolean(),
        ];
    }
}
