<?php

require_once('conn.php');

// insert task name
if(isset($_POST['name'])) {
  $task_name = $_POST['name'];
  $query = "INSERT into task(name) VALUES ('$task_name')";
  $result = mysqli_query($conn, $query);

  if (!$result) {
    die('error inserting task!');
  }

  echo "task added successfully!";  

}

?>