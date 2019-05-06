<?php
//abrindo o json externo
$json = json_decode(file_get_contents('teste.json'));

//Editando a linha que vc quer
$json->layers[1]->nm = "Mensagem Enviada";

//Salvando as edições
$json_editado = file_put_contents('teste.json',json_encode($json));

//Carregando json após ser salvo já editado
$json = json_decode(file_get_contents('teste.json'));
//Imprimindo json editado
var_dump($json);
?>


<!-- É possível ler o json com php e editar o json com novo valor? Tipo pego nome Ricardo e altero o nome para Joao? -->