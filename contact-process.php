<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ime = isset($_POST["ime"]) ? strip_tags($_POST["ime"]) : '';
    $email = isset($_POST["email"]) ? strip_tags($_POST["email"]) : '';
    $poruka = isset($_POST["poruka"]) ? strip_tags($_POST["poruka"]) : '';

    // Pripremi email
    $to = "info@blocksize.hr";
    $subject = "Contact Form Submission - Blocksize";
    $body = "Name: $ime\nEmail: $email\nMessage:\n$poruka";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    // Pošalji email
    $mail_sent = mail($to, $subject, $body, $headers);

    // Spremi podatke u datoteku
    $log = date("Y-m-d H:i:s") . " | Name: $ime | Email: $email | Message: $poruka\n";
    file_put_contents("form-submissions.txt", $log, FILE_APPEND);

    // Prikaz poruke o uspješnom slanju
    if ($mail_sent) {
        echo "<script>alert('Thank you for your message! We will get back to you soon.'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('There was a problem sending your message. Please try again later.'); window.location.href='contact.html';</script>";
    }
    exit();
} else {
    header("Location: index.html");
    exit();
}
?>
