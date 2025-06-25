<?php
require_once '../cors.php';

require_once '../config/db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

// Validation
if (empty($data['id']) || empty($data['name']) || empty($data['email']) || empty($data['dob'])) {
    http_response_code(400);
    echo json_encode(["message" => "ID, Name, Email, and DOB are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE users SET name=?, email=?, dob=? WHERE id=?");
    $stmt->execute([$data['name'], $data['email'], $data['dob'], $data['id']]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>