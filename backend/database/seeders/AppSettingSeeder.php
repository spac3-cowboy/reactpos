<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\AppSetting;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = new AppSetting();
        $setting->companyName = 'Company Name';
        $setting->tagLine = 'Tag Line';
        $setting->address = 'Address';
        $setting->phone = '2345678';
        $setting->email = 'company@gmail.com';
        $setting->website = 'Website';
        $setting->footer = 'Footer';
        $setting->logo = null;

        $setting->save();
    }
}
