<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $ime = isset($_POST["ime"]) ? strip_tags(trim($_POST["ime"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $poruka = isset($_POST["poruka"]) ? strip_tags(trim($_POST["poruka"])) : '';
    
    // Validate required data
    $errors = [];
    if (empty($ime)) {
        $errors[] = "Name is required";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    if (empty($poruka)) {
        $errors[] = "Message is required";
    }
    
    // Create a log file regardless of success
    $log_dir = __DIR__ . '/logs';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    $log = date("Y-m-d H:i:s") . " | Name: $ime | Email: $email | Message: $poruka\n";
    $log_file = $log_dir . "/form-submissions.log";
    file_put_contents($log_file, $log, FILE_APPEND);
    
    // Process the form if no errors
    if (empty($errors)) {
        // Email settings
        $to = "info@blocksize.hr";
        $subject = "Contact Form Submission - Blocksize";
        
        // Create email content
        $email_content = "Name: $ime\r\n";
        $email_content .= "Email: $email\r\n\r\n";
        $email_content .= "Message:\r\n$poruka\r\n";
        
        // Email headers
        $headers = "From: $ime <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Attempt to send email
        $mail_sent = @mail($to, $subject, $email_content, $headers);
        
        // Create a backup of submitted data in HTML format
        $submission_time = date('Y-m-d_H-i-s');
        $backup_dir = __DIR__ . '/submissions';
        if (!is_dir($backup_dir)) {
            mkdir($backup_dir, 0755, true);
        }
        $backup_content = "<!DOCTYPE html>\n<html>\n<head>\n";
        $backup_content .= "<meta charset='UTF-8'>\n";
        $backup_content .= "<title>Contact Form Submission - $submission_time</title>\n";
        $backup_content .= "<style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px;}table{width:100%;border-collapse:collapse;}td,th{padding:8px;border:1px solid #ddd;}th{background-color:#f2f2f2;}</style>\n";
        $backup_content .= "</head>\n<body>\n";
        $backup_content .= "<h1>Contact Form Submission</h1>\n";
        $backup_content .= "<p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>\n";
        $backup_content .= "<table>\n";
        $backup_content .= "<tr><th>Field</th><th>Value</th></tr>\n";
        $backup_content .= "<tr><td>Name</td><td>" . htmlspecialchars($ime) . "</td></tr>\n";
        $backup_content .= "<tr><td>Email</td><td>" . htmlspecialchars($email) . "</td></tr>\n";
        $backup_content .= "<tr><td>Message</td><td>" . nl2br(htmlspecialchars($poruka)) . "</td></tr>\n";
        $backup_content .= "</table>\n";
        $backup_content .= "</body>\n</html>";
        file_put_contents("$backup_dir/submission_{$submission_time}.html", $backup_content);
        
        // Debug info for local development
        $is_local = ($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['REMOTE_ADDR'] == '::1' || strpos($_SERVER['REMOTE_ADDR'], '192.168') === 0);
        
        if ($mail_sent || $is_local) {
            // Success - always show success on local environment
            // Show a popup message with the same design as the site
            echo '<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8" />
  <title>Hvala - Blocksize</title>
  <link rel="shortcut icon" href="assets/img/logo/f-icon.png" type="image/x-icon" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/fontawesome.css" />
  <link rel="stylesheet" href="assets/css/flaticon_aina.css" />
  <link rel="stylesheet" href="assets/css/animate.css" />
  <link rel="stylesheet" href="assets/css/global.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/custom.css" />
  <style>
    .thank-you-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      background-color: rgba(27, 28, 54, 0.9);
    }
    .thank-you-content {
      max-width: 500px;
      background: linear-gradient(135deg, #eb5c18 0%, #f95055 45.72%, #ca2db8 100%);
      border-radius: 15px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      color: #fff;
    }
    .thank-you-content h2 {
      font-size: 36px;
      margin-bottom: 20px;
      color: #fff;
      font-weight: 600;
    }
    .thank-you-content p {
      font-size: 18px;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .thank-you-btn {
      display: inline-block;
      padding: 12px 30px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .thank-you-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="thank-you-popup">
    <div class="thank-you-content">
      <h2>Thank You for Your Message!</h2>
      <p>We will contact you as soon as possible.</p>
      <a href="contact.html" class="thank-you-btn">Return to website</a>
    </div>
  </div>
  <script>
    setTimeout(function() {
      window.location.href = "contact.html";
    }, 5000);
  </script>
</body>
</html>';
            exit;
        } else {
            // Mail sending failed - still show popup but with error message
            echo '<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8" />
  <title>Greška - Blocksize</title>
  <link rel="shortcut icon" href="assets/img/logo/f-icon.png" type="image/x-icon" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/fontawesome.css" />
  <link rel="stylesheet" href="assets/css/flaticon_aina.css" />
  <link rel="stylesheet" href="assets/css/animate.css" />
  <link rel="stylesheet" href="assets/css/global.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/custom.css" />
  <style>
    .error-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      background-color: rgba(27, 28, 54, 0.9);
    }
    .error-content {
      max-width: 500px;
      background: linear-gradient(135deg, #ca2db8 0%, #f95055 45.72%, #eb5c18 100%);
      border-radius: 15px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      color: #fff;
    }
    .error-content h2 {
      font-size: 32px;
      margin-bottom: 20px;
      color: #fff;
      font-weight: 600;
    }
    .error-content p {
      font-size: 17px;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    .error-btn {
      display: inline-block;
      padding: 12px 30px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .error-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="error-popup">
    <div class="error-content">
      <h2>Message Processing Issue</h2>
      <p>Unfortunately, we couldn\'t send your message at this time, but your data has been saved.</p>
      <p>Please try again later or contact us directly at info@blocksize.hr</p>
      <a href="contact.html" class="error-btn">Return to website</a>
    </div>
  </div>
  <script>
    setTimeout(function() {
      window.location.href = "contact.html";
    }, 7000);
  </script>
</body>
</html>';
        }
    } else {
        // Show validation errors
        echo "<div style='background:#f8d7da;color:#721c24;padding:10px;margin:10px;border-radius:5px;'>";  
        echo "<h2>Form Validation Errors</h2>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
        echo "<p><a href='javascript:history.back()'>Go back and correct these errors</a></p>";
        echo "</div>";
    }
} else {
    // Not a POST request
    header("Location: index.html");
    exit();
}
?>
