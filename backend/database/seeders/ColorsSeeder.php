<?php

namespace Database\Seeders;

use App\Models\Colors;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'name' => "Red",
                'colorCode' => "#FF0000",
            ],
            [
                'name' => "Green",
                'colorCode' => "#008000",
            ],
            [
                'name' => "Blue",
                'colorCode' => "#0000FF",
            ],
            [
                'name' => "Yellow",
                'colorCode' => "#FFFF00",
            ],
            [
                'name' => "Black",
                'colorCode' => "#000000",
            ],
            [
                'name' => "White",
                'colorCode' => "#FFFFFF",
            ],
            [
                'name' => "Orange",
                'colorCode' => "#FFA500",
            ],
            [
                'name' => "Purple",
                'colorCode' => "#800080",
            ],
            [
                'name' => "Pink",
                'colorCode' => "#FFC0CB",
            ],
            [
                'name' => "Brown",
                'colorCode' => "#A52A2A",
            ],
            [
                'name' => "Grey",
                'colorCode' => "#808080",
            ],
            [
                'name' => "Gold",
                'colorCode' => "#FFD700",
            ],
            [
                'name' => "Silver",
                'colorCode' => "#C0C0C0",
            ],
            [
                'name' => "Cyan",
                'colorCode' => "#00FFFF",
            ],
            [
                'name' => "Magenta",
                'colorCode' => "#FF00FF",
            ],
            [
                'name' => "Lime",
                'colorCode' => "#00FF00",
            ],
            [
                'name' => "Teal",
                'colorCode' => "#008080",
            ],
            [
                'name' => "Maroon",
                'colorCode' => "#800000",
            ],
            [
                'name' => "Navy",
                'colorCode' => "#000080",
            ],
            [
                'name' => "Olive",
                'colorCode' => "#808000",
            ],

        ];

        foreach ($colors as $item) {
            $color = new Colors();
            $color->name = $item['name'];
            $color->colorCode = $item['colorCode'];
            $color->save();
        }
    }
}
