<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];
    
    function validate_input($data) {
        return htmlspecialchars(trim($data));
    }
    $first_name = validate_input($_POST['first_name'] ?? '');
    $last_name = validate_input($_POST['last_name'] ?? '');
    $gender = validate_input($_POST['gender'] ?? '');
    $email = validate_input($_POST['email'] ?? '');
    $subject = validate_input($_POST['subject'] ?? '');
    $contact_number = validate_input($_POST['number'] ?? '');
    $dob = validate_input($_POST['dob'] ?? '');
    $address = validate_input($_POST['address'] ?? '');
    $pincode = validate_input($_POST['pincode'] ?? '');
    $state = validate_input($_POST['state'] ?? '');
    $country = validate_input($_POST['country'] ?? '');

    $languages = $_POST['languages'] ?? [];
    $languages_str = !empty($languages) ? implode(", ", array_map('validate_input', $languages)) : "None";
    
    if (empty($first_name)) $errors[] = "First Name is required.";
    if (empty($last_name)) $errors[] = "Last Name is required.";
    if (empty($gender)) $errors[] = "Gender is required.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid Email is required.";
    if (empty($subject)) $errors[] = "Subject of Interest is required.";
    if (empty($contact_number) || !preg_match("/^[0-9]{10}$/", $contact_number)) $errors[] = "Valid 10-digit Contact Number is required.";
    if (empty($dob)) $errors[] = "Date of Birth is required.";
    if (empty($address)) $errors[] = "Address is required.";
    if (empty($pincode) || !preg_match("/^[0-9]{6}$/", $pincode)) $errors[] = "Valid 6-digit Pin Code is required.";
    if (empty($state)) $errors[] = "State is required.";
    if (empty($country)) $errors[] = "Country is required.";
    
    if (!empty($errors)) {
        echo "<h2>Form Validation Errors:</h2><ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
    } else {
        echo "<h2>Submitted Form Data</h2>";
        echo "<p><b>First Name:</b> $first_name</p>";
        echo "<p><b>Last Name:</b> $last_name</p>";
        echo "<p><b>Gender:</b> $gender</p>";
        echo "<p><b>Email:</b> $email</p>";
        echo "<p><b>Subject of Interest:</b> $subject</p>";
        echo "<p><b>Languages:</b> $languages_str</p>";
        echo "<p><b>Contact Number:</b> $contact_number</p>";
        echo "<p><b>Date of Birth:</b> $dob</p>";
        echo "<p><b>Address:</b> $address</p>";
        echo "<p><b>Pin Code:</b> $pincode</p>";
        echo "<p><b>State:</b> $state</p>";
        echo "<p><b>Country:</b> $country</p>";
    }
} else {
    echo "<h2>No data received.</h2>";
}
?>
