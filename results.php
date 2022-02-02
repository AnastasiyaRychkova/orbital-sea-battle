<?php

function write($data, $file_name)
{
	if( !is_array( $data ) ){
		return false;
	}
	if( $file_name && ! is_dir( dirname( $file_name ) ) ){
		return false;
	}

	$file = fopen( $file_name, 'a');

	fputcsv($file, $data, ';', '"');

	fclose( $file );
}



$date = date( "Y-m-d H:i:s" );
if( !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
	$ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
	$ip_address = $_SERVER['REMOTE_ADDR'];
}

write(
	[
		$date,
		$_POST["id"],
		$_POST["var"],
		$_POST["startT"],
		$_POST["endT"],
		$_POST["onPage"],
		$_POST["outPage"],
		$_POST["away"],
		$_POST["level"],
		$_POST["score"],
		$ip_address
	],
	'res/general.csv'
);

write(
	[
		$date,
		$_POST["id"],
		$_POST["var"],
		$_POST["bWish"],
		$_POST["bGame"],
		$_POST["a1"],
		$_POST["a2"],
	],
	'res/assessments.csv'
);

write(
	[
		$date,
		$_POST["id"],
		$_POST["var"],
		$_POST["res"],
	],
	'res/results.csv'
);

write(
	[
		$date,
		$_POST["id"],
		$_POST["var"],
		$_POST["dur"],
	],
	'res/durations.csv'
);

write(
	[
		$date,
		$_POST["id"],
		$_POST["var"],
		$_POST["atmp"],
	],
	'res/attempts.csv'
);

if( !empty($_POST["game"]) )
{
	write(
		[
			$date,
			$_POST["id"],
			$_POST["var"],
			$_POST["game"],
		],
		'res/game.csv'
	);
}

?>