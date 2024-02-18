<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = new Users();
        $user->username = 'admin';
        $user->password = Hash::make('admin');
        $user->roleId = 1;
        $user->idNo = 1001;
        $user->save();

        $user = new Users();
        $user->username = 'staff';
        $user->password = Hash::make('staff');
        $user->roleId = 2;
        $user->idNo = 1002;
        $user->save();

        $user = new Users();
        $user->username = 'e-commerce';
        $user->password = Hash::make('e-commerce');
        $user->roleId = 3;
        $user->idNo = 1003;
        $user->save();
    }
}
