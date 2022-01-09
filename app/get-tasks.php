<?php

  require_once('conn.php');

  $query = "SELECT * from task";
  $result = mysqli_query($conn, $query);
  if(!$result) {
    die('error getting tasks'. mysqli_error($conn));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>