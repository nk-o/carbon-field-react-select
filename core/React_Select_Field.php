<?php

namespace Carbon_Field_React_Select;

use Carbon_Fields\Field\Select_Field;

class React_Select_Field extends Select_Field {
    /**
     * Props
     * Props descriptions you can find here - https://github.com/JedWatson/react-select#select-props
     *
     * @var array
     */
    protected $props = array(
        'isClearable'          => true,
        'isDisabled'           => false,
        'autoFocus'            => false,
        'closeMenuOnSelect'    => true,
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
        'isSearchable'         => true,
        'simpleValue'          => false,
        'tabSelectsValue'      => true,
        'trimFilter'           => false,
        'valueKey'             => 'value',
        'className'            => '',
        'icons'                => false,

        'placeholder'          => 'Select...',
        'clearAllText'         => 'Clear all',
        'clearValueText'       => 'Clear value',
        'noResultsText'        => 'No results found',
        'searchPromptText'     => 'Type to search',
    );

	/**
	 * Prepare the field type for use.
	 * Called once per field type when activated.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_React_Select\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-react-select', $path );
	}

	/**
	 * Enqueue scripts and styles in admin.
	 * Called once per field type.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function admin_enqueue_scripts() {
        $root_uri = apply_filters( 'carbon_field_react_select_root_uri', \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_React_Select\DIR ) );

		// Enqueue field styles.
		wp_enqueue_style( 'carbon-field-react-select', $root_uri . '/build/bundle.css' );

		// Enqueue field scripts.
		wp_enqueue_script( 'carbon-field-react-select', $root_uri . '/build/bundle.js', array( 'carbon-fields-core' ) );
	}

    /**
     * {@inheritDoc}
     */
    public function to_json( $load ) {
        $field_data = parent::to_json( $load );
        $options = $this->parse_options( $this->get_options(), true );
        $value = strval( $this->get_formatted_value() );
        $field_data = array_merge( $field_data, array(
            'value'    => strval( $value ),
            'options'  => $options,
            'props'    => $this->get_props()
        ) );
        return $field_data;
    }

    /**
     * Changes the options array structure. This is needed to keep the array items order when it is JSON encoded.
     * Will also work with a callable that returns an array.
     *
     * @param array|callable $options
     * @return array
     */
    protected function parse_options( $options, $stringify_value = false ) {
        $parsed = array();
        if ( is_callable( $options ) ) {
            $options = call_user_func( $options );
        }
        foreach ( $options as $key => $value ) {
            if ( $this->get_props()['icons'] ) {
                $parsed[] = array(
                    'value' => $stringify_value ? strval( $value['value'] ) : $value['value'],
                    'label' => strval( $value['label'] ),
                    'icon' => $value['icon'],
                );
            } else {
                $parsed[] = array(
                    'value' => $stringify_value ? strval( $key ) : $key,
                    'label' => strval( $value ),
                );
            }
        }
        return $parsed;
    }

    /**
     * Get props
     *
     * @return array
     */
    public function get_props() {
        return $this->props;
    }

    /**
     * Set props
     *
     * @param  string   $props
     * @return self     $this
     */
    public function set_props( $props ) {
        $this->props = array_merge( $this->props, $props );
        return $this;
    }
}
