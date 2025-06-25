<?php
require_once '../cors.php';

require_once '../config/db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

// Validation
if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['dob'])) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

// Hash password
$hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['name'], $data['email'], $hashed_password, $data['dob']]);

    echo json_encode([
        "id" => $pdo->lastInsertId(),
        "name" => $data['name'],
        "email" => $data['email'],
        "dob" => $data['dob']
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
