/**
 * External dependencies.
 */
import Select, { components } from 'react-select';
import selectStyles from 'gutenberg-react-select-styles';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { __ } = wp.i18n;

/**
 * Component.
 */
class React_Select_Field extends Component {

    /**
     * Handles the change of the input.
     *
     * @param {Object} e
     * @return {void}
     */
    handleChange = ( e ) => {
        const { id, onChange } = this.props;

        onChange( id, e?.value || '' );
    }

    /**
     * Get Icon by Value.
     *
     * @param value
     * @return {string}
     */
    getIcon( value ) {
        const { field } = this.props;
        let icon = '';
        if ( typeof field.options !== 'undefined' ) {
            Object.keys( field.options ).map( ( k ) => {
                if ( field.options[ k ].value === value ) {
                    icon = field.options[ k ].icon;
                }
            } );
        }
        return icon;
    }

    /**
     * Get Label by Value.
     *
     * @param value
     * @return {string}
     */
    getLabel( value ) {
        const { field } = this.props;
        let label = '';
        if ( typeof field.options !== 'undefined' ) {
            Object.keys( field.options ).map( ( k ) => {
                if ( field.options[ k ].value === value ) {
                    label = field.options[ k ].label;
                }
            } );
        }
        return label;
    }

    /**
     * Print String how Html.
     *
     * @param string
     * @return {{__html: *}}
     */
    createMarkup( string ) {
        return {__html: string};
    }

    /**
     * Renders the component.
     *
     * @return {Object}
     */
    render() {
        const {
            id,
            name,
            field,
        } = this.props;

        const { Option } = components;
        const {
            icons,
        } = field.props;
        let customComponents = {};
        let value = field.value ? { value: field.value, label: this.getLabel( field.value ) } : '';

        const IconOption = (props) => (
            <Option {...props}>
                <span className="input-select-label-with-icon">
                { props.data.icon && <span className="input-select__icon" dangerouslySetInnerHTML={this.createMarkup( props.data.icon )}/> }
                {props.data.label}
                </span>
            </Option>
        );

        if ( icons ) {
            value = field.value ?
                {
                    value: field.value,
                    label: <span className="input-select-label-with-icon"><span className="input-select__icon" dangerouslySetInnerHTML={ this.createMarkup( this.getIcon( field.value ) ) } />{ this.getLabel( field.value ) }</span>,
                } : '';
            customComponents = { Option: IconOption };
        }

        return (
            field.options.length > 0
                ? (
                    <Select
                        id={ id }
                        name={ name }
                        value={ value }
                        defaultValue={ field.options [0] }
                        options={ field.options }
                        onChange={ this.handleChange }
                        className="cf-react__select"
                        classNamePrefix="cf-react-select"
                        components={ customComponents }
						styles={ selectStyles }
                        {...field.props}
                    />
                )
                : __( 'No options' )
        );
    }
}

/**
 * Validate the props.
 *
 * @type {Object}
 */
React_Select_Field.propTypes = {
    name: PropTypes.string,
    field: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            name: PropTypes.string,
        })),
        props: PropTypes.arrayOf(PropTypes.shape({
            isClearable: PropTypes.bool,
            isDisabled: PropTypes.bool,
            autoFocus: PropTypes.bool,
            closeMenuOnSelect: PropTypes.bool,
            ignoreAccents: PropTypes.bool,
            ignoreCase: PropTypes.bool,
            labelKey: PropTypes.string,
            multi: PropTypes.bool,
            onBlurResetsInput: PropTypes.bool,
            onCloseResetsInput: PropTypes.bool,
            onSelectResetsInput: PropTypes.bool,
            openOnClick: PropTypes.bool,
            openOnFocus: PropTypes.bool,
            removeSelected: PropTypes.bool,
            pageSize: PropTypes.number,
            rtl: PropTypes.bool,
            scrollMenuIntoView: PropTypes.bool,
            isSearchable: PropTypes.bool,
            simpleValue: PropTypes.bool,
            tabSelectsValue: PropTypes.bool,
            trimFilter: PropTypes.bool,
            valueKey: PropTypes.string,
            className: PropTypes.string,
            icons: PropTypes.bool,

            placeholder: PropTypes.string,
            clearAllText: PropTypes.string,
            clearValueText: PropTypes.string,
            noResultsText: PropTypes.string,
            searchPromptText: PropTypes.string,
        })),
    }),
    handleChange: PropTypes.func,
};

export default React_Select_Field;
