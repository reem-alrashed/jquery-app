<?php

require_once('conn.php');

if(isset($_POST['id'])) {
  $id = $_POST['id'];
  $query = "DELETE FROM task WHERE id = $id"; 
  $result = mysqli_query($conn, $query);

  if (!$result) {
    die('task deletion failed!');
  }

  echo "task is deleted successfully!";  

}

?>