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
        'left'    => 'Left',
        'center'  => 'Center',
        'right'   => 'Right',
    ) ),
```

Available Props:
```php
Field::make( 'react-select', 'alignment', 'Alignment' )
    ->add_options( array(
        'left'    => 'Left',
        'center'  => 'Center',
        'right'   => 'Right',
    ) )
    ->set_props( array(
        'clearable'            => true,
        'disabled'             => false,
        'autoFocus'            => false,
        'closeOnSelect'        => true,
        'ignoreAccents'        => true,
        'ignoreCase'           => true,
        'labelKey'             => 'label',
        'multi'                => false,
        'onBlurResetsInput'    => true,
        'onCloseResetsInput'   => true,
        'onSelectResetsInput'  => true,
        'openOnClick'          => true,
        'openOnFocus'          => false,
        'removeSelected'       => true,
        'pageSize'             => 5,
        'rtl'                  => false,
        'scrollMenuIntoView'   => true,
        'searchable'           => true,
        'simpleValue'          => false,
        'tabSelectsValue'      => true,
        'trimFilter'           => false,
        'valueKey'             => 'value',
        'className'            => '',

        'placeholder'          => 'Select...',
        'clearAllText'         => 'Clear all',
        'clearValueText'       => 'Clear value',
        'noResultsText'        => 'No results found',
        'searchPromptText'     => 'Type to search',
    ) ),
```
Props descriptions read here - https://github.com/JedWatson/react-select#select-props
