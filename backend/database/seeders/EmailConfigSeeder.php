<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\EmailConfig;

class EmailConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $emailConfig = new EmailConfig();
        $emailConfig->emailConfigName = 'Omega';
        $emailConfig->emailHost = 'server.vibd.me';
        $emailConfig->emailPort = '465';
        $emailConfig->emailUser = 'no-reply@osapp.net';
        $emailConfig->emailPass = 'password';
        $emailConfig->save();
    }
}
