# Carbon Field React_Select

Added functionality of [react-select](https://github.com/JedWatson/react-select) in [Carbon Fields](https://github.com/htmlburger/carbon-fields) plugin.

## Install

Using Composer:
```
composer require nk-o/carbon-field-react-select
```

## Usage

Default:
```php
Field::make( 'react-select', 'alignment', 'Alignment' )
    ->add_options( array(
        'left' => 'Left',
        'center' => 'Center',
        'right' => 'Right',
    ) ),
```

Placeholder:
```php
Field::make( 'react-select', 'alignment', 'Alignment' )
    ->add_options( array(
        'left' => 'Left',
        'center' => 'Center',
        'right' => 'Right',
    ) )
    ->set_placeholder( __( 'Choose Alignment', 'crb' ) ),
```
