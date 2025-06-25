<?php
require_once 'cors.php';

$request_uri = $_SERVER['REQUEST_URI'];
$api_base = '/user-crud-app/backend/api/';

if (strpos($request_uri, $api_base) === 0) {
    $endpoint = str_replace($api_base, '', $request_uri);
    $endpoint = explode('?', $endpoint)[0]; 

    switch ($endpoint) {
        case 'create_user.php':
            require_once 'api/create_user.php';
            break;
        case 'read_users.php':
            require_once 'api/read_users.php';
            break;
        case 'update_user.php':
            require_once 'api/update_user.php';
            break;
        case 'delete_user.php':
            require_once 'api/delete_user.php';
            break;
        default:
            http_response_code(404);
            echo json_encode(['message' => 'Endpoint not found']);
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Invalid API path']);
}
