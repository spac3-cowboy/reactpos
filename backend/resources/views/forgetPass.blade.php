<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
    </head>
    <body>
        <h3>Hello, {{$mailData['name']}}</h3>
        <h3>You recently requested a password reset for your account.Here is your reset password.</h3>
        <h3>Email: <strong>{{$mailData["email"]}}</strong></h3>
        <h3>Password: <strong>{{$mailData['password']}}</strong></h3>
        <h3>Thank you,</h3>
        <h3>{{$mailData['companyName']}}</h3>
        <span style="color: gray;">P.S : We recommend you to change your password after login.</span><br>
        <span style="color: gray;">Note : This is an automated email. Please do not reply to this email.</span>
    </body>
</html>
