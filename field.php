<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_React_Select\React_Select_Field;

define( 'Carbon_Field_React_Select\\DIR', __DIR__ );

Carbon_Fields::extend( React_Select_Field::class, function( $container ) {
	return new React_Select_Field(
		$container['arguments']['type'],
		$container['arguments']['name'],
		$container['arguments']['label']
	);
} );
