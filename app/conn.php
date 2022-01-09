<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = "taskmanager";

// Create connection
$conn = new mysqli_connect($servername,$username,$password,$database);

// Test connection

if($conn->connect_error){
    die("connection failed, error: ". $conn->connect_error);
}
echo "connected successfully!"

?>