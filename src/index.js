/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import React_Select_Field from './main';

registerFieldType( 'react_select', React_Select_Field );
