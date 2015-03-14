<?php

  require("config.php");

  $dbh = getConnection();

  $name = $_POST["name"];
  $email = $_POST["email"];
  $place = $_POST["city"];
  $people = $_POST["people"];
  $days_in_diocese = 0;
  if(isset($_POST["days_in_diocese"]) && $_POST["days_in_diocese"] == "1") {
    $days_in_diocese = 1;
  }
  $calasantian_day = 0;
  if(isset($_POST["calasantian_day"]) && $_POST["calasantian_day"] == "1") {
    $calasantian_day = 1;
  }

  date_default_timezone_set('Europe/Warsaw');
  $date = date('Y-m-d H:i:s');
  
  $sql = 'INSERT INTO wyd_organisers (id, name, email, place, people, days_in_diocese, calasantian_day, created_at) VALUES (NULL, :name, :email, :place, :people, :days_in_diocese, :calasantian_day, :date)';

  $sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
  $sth->execute(array(':name' => $name, ':email' => $email, ':place' => $place, ':people' => $people, ':days_in_diocese' => $days_in_diocese, ':calasantian_day' => $calasantian_day, ':date' => $date));

  $dbh = null;

?>