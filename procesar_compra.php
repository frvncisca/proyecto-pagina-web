<?php
header('Content-Type: application/json');

// Conectar a la base de datos
$servername = 'localhost'; 
$username = 'root'; 
$password = ''; 
$dbname = 'rapideats'; 

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del carrito desde la solicitud
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['carrito'])) {
        echo json_encode(['success' => false, 'message' => 'Datos del carrito no válidos']);
        exit;
    }
    $carrito = $data['carrito'];

    // Insertar los datos del carrito en la base de datos
    $conn->begin_transaction();

    try {
        foreach ($carrito as $item) {
            if (!isset($item['nombre'], $item['precio'], $item['cantidad'])) {
                throw new Exception('Datos del artículo no válidos');
            }
            $stmt = $conn->prepare('INSERT INTO compra (nombre, precio, cantidad) VALUES (?, ?, ?)');
            $stmt->bind_param('sdi', $item['nombre'], $item['precio'], $item['cantidad']);
            $stmt->execute();
        }
        $conn->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error al guardar los datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
}

$conn->close();
?>
