<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $country = isset($_POST['country']) ? $_POST['country'] : '';

    switch ($country) {
        case "U":
            echo "Visa required for most applicants.";
            break;
        case "C":
            echo "Visa required unless you have an eTA.";
            break;
        case "I":
            echo "Visa required before travel.";
            break;
        case "UK":
            echo "Visa depends on the duration of stay.";
            break;
        case "AUS":
            echo "eVisa available for eligible travelers.";
            break;
        default:
            echo "Invalid country selection.";
            break;
    }
} else {
    echo "Invalid request.";
}
?>
