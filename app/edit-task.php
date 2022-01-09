
   
<?php

require_once('conn.php');

if(isset($_POST['id'])) {
$task_name = $_POST['name']; 
$id = $_POST['id'];
$query = "UPDATE task SET name = '$task_name' WHERE id = '$id'";
$result = mysqli_query($conn, $query);

if (!$result) {
  die('edit task failed!');
}
echo "task is updated successfully!";  

}

?>