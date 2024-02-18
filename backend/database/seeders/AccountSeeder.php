<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account = new Account();
        $account->name = 'Asset';
        $account->type = 'Asset';
        $account->save();

        $account = new Account();
        $account->name = 'Liability';
        $account->type = 'Liability';
        $account->save();

        $account = new Account();
        $account->name = 'Capital';
        $account->type = 'Owner\'s Equity';
        $account->save();

        $account = new Account();
        $account->name = 'Withdrawal';
        $account->type = 'Owner\'s Equity';
        $account->save();

        $account = new Account();
        $account->name = 'Revenue';
        $account->type = 'Owner\'s Equity';
        $account->save();

        $account = new Account();
        $account->name = 'Expense';
        $account->type = 'Owner\'s Equity';
        $account->save();

        $account = new Account();
        $account->name = 'vat';
        $account->type = 'Govt.';
        $account->save();

    }
}
