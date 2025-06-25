<?php
require_once '../config/db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$id = $_GET['id'] ?? '';

if (empty($id)) {
    http_response_code(400);
    echo json_encode(["message" => "User ID is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "User deleted successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>