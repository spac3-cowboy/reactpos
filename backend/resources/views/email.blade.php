<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $mailData['title'] }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 12px;
            line-height: 1.5;
            color: #666;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
<div class="container">
    <p>{{ $mailData['body'] }}</p>
</div>
</body>
</html>
