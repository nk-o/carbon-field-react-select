/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, branch, renderComponent, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import NoOptions from 'fields/components/no-options';
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

/**
 * Render a number input field.
 *
 * @param  {Object}        props
 * @param  {String}        props.name
 * @param  {Object}        props.field
 * @param  {Function}      props.handleChange
 * @return {React.Element}
 */
export const React_Select_Field = ({
    name,
    field,
    handleChange
}) => {
    return <Field field={field} {...field.attributes}>
        <Select
            id={field.id}
            name={name}
            value={field.value}
            options={field.options}
            placeholder={field.placeholder}
            disabled={!field.ui.is_visible}
            onChange={handleChange}
            {...field.attributes}
        />
    </Field>;
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
        attributes: PropTypes.object,
        placeholder: PropTypes.string,
    }),
    handleChange: PropTypes.func,
};

/**
 * The enhancer.
 *
 * @type {Function}
 */
export const enhance = compose(
    /**
     * Connect to the Redux store.
     */
    withStore(),

    /**
     * Render "No-Options" component when the field doesn't have options.
     */
    branch(
        /**
         * Test to see if the "No-Options" should be rendered.
         */
        ({ field: { options } }) => options && options.length,

        /**
         * Render the actual field.
         */
        compose(
            /**
             * Attach the setup hooks.
             */
            withSetup(),

            /**
             * Pass some handlers to the component.
             */
            withHandlers({
                handleChange: ({ field, setFieldValue }) => (val) => {
                    setFieldValue(field.id, val ? val.value : false);
                },
            })
        ),

        /**
         * Render the empty component.
         */
        renderComponent(NoOptions)
    )
);

export default setStatic('type', [
    'react-select',
])(enhance(React_Select_Field));

