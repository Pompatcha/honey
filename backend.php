<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect data from the POST request
    $fullName = $_POST['full-name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Use PHPMailer to send an email (or integrate EmailJS here if needed)
    // Include PHPMailer library here to send email, or use EmailJS from the backend
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.yourmailprovider.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email@example.com';
        $mail->Password = 'your_password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        //Recipients
        $mail->setFrom('from_email@example.com', 'Mailer');
        $mail->addAddress('recipient_email@example.com', 'Joe User'); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body    = "Name: $fullName<br>Email: $email<br>Message: $message";

        // Send email
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
