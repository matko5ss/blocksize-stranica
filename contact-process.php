<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ime = isset($_POST["ime"]) ? strip_tags($_POST["ime"]) : '';
    $email = isset($_POST["email"]) ? strip_tags($_POST["email"]) : '';
    $poruka = isset($_POST["poruka"]) ? strip_tags($_POST["poruka"]) : '';

    // Pripremi email
    $to = "info@blocksize.hr";
    $subject = "Kontakt forma - Blocksize";
    $body = "Ime: $ime\nEmail: $email\nPoruka:\n$poruka";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    // Pošalji email
    mail($to, $subject, $body, $headers);

    // Spremi podatke u datoteku
    $log = date("Y-m-d H:i:s") . " | Ime: $ime | Email: $email | Poruka: $poruka\n";
    file_put_contents("form-submissions.txt", $log, FILE_APPEND);

    // Preusmjeri korisnika na stranicu za zahvalnicu
    header("Location: hvala.html");
    exit();
} else {
    header("Location: index.html");
    exit();
}
?>
