<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Member;
use App\Models\User;

class MemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Member::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'role' => $this->faker->word(),
            'memberable_type' => $this->faker->word(),
            'memberable_id' => $this->faker->numberBetween(-100000, 100000),
        ];
    }
}
