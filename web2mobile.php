<?php

header('Access-Control-Allow-Origin: *');

$phoneNumber = $_GET['w2mPhoneNumber'];
$carrier = $_GET['w2mCarrier'];
$location = $_GET['w2mLocation'];

$textRecipient = $phoneNumber . "@" . $carrier;

$message = $location;
$subject = "Web2Mobile";

mail($textRecipient, $subject, $message);

?>