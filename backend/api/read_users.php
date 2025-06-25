<?php
require_once '../cors.php';

require_once '../config/db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

try {
    $stmt = $pdo->query("SELECT id, name, email, dob FROM users");
    $users = $stmt->fetchAll();
    
    echo json_encode($users);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>