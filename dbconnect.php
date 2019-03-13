	
<?php
  define('HOST','108.167.149.240');
  define('USER','ecoboxre_ecouser');
  define('PASS','BcktcY2HsEz]9e~?');
  define('DB','ecoboxre_ecobox');
  $con = mysqli_connect(HOST,USER,PASS,DB);
  
  if (!$con){
	 die("Error en conexion" . mysqli_connect_error()) ;
  } 


?>
