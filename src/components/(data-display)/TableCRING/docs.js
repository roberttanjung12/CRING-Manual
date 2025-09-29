/**
 * @fileoverview
 * TableCRING is a comprehensive table component that provides powerful data display
 * capabilities with built-in filtering, pagination, and customizable cell rendering.
 * This file contains JSDoc type definitions for all the components in the TableCRING module.
 *
 * @typedef {Object} TableCRINGColumnFilter
 * @property {'text'|'select'|'autocomplete'} type - The filter type ('text', 'select', or 'autocomplete')
 * @property {string} name - The name/key for the filter field
 * @property {string} query - The query parameter name to use when submitting filters
 * @property {string|string[]|React.ReactNode} [label] - The label for the filter field
 * @property {string} [nameFrom] - The column name this filter belongs to
 * @property {Array<{label: string, value: string}>} [options] - Options for select type filters
 * @property {string} [inputType] - HTML input type for text filters (e.g., 'text', 'number', 'email')
 */

/**
 * Base table column properties
 *
 * @typedef {Object} TableCRINGColumnPropBase
 * @property {string|string[]|React.ReactNode} label - The label for the column header
 * @property {string} name - The unique identifier for the column, used to map data
 * @property {boolean} [isOpen=true] - Whether the column is visible
 * @property {Object} [head] - Props to pass to the MUI TableCell component for the header
 * @property {Object} [cell] - Props to pass to the MUI TableCell component for data cells
 * @property {function(Record<string, any>): React.ReactNode} [content] - Function to render custom content for the cell
 */

/**
 * Filter configuration for text input fields
 *
 * @typedef {Object} TableCRINGColumnFilterItemText
 * @property {'text'} type - Must be 'text'
 * @property {string} name - The name/key for the filter field
 * @property {string} query - The query parameter name to use when submitting filters
 * @property {string|string[]|React.ReactNode} [label] - The label for the filter field
 * @property {string} [nameFrom] - The column name this filter belongs to
 * @property {string} [inputType='text'] - HTML input type
 * @property {TableCRINGColumnFilterItemParamEnum|Array<TableCRINGColumnFilterItemParamEnum>} [params] - Additional parameters
 * @property {string|string[]|TableCRINGColumnFilterItemResetEnum|Array<TableCRINGColumnFilterItemResetEnum>} [resets] - Fields to reset when this filter changes
 */

/**
 * Filter configuration for select fields
 *
 * @typedef {Object} TableCRINGColumnFilterItemSelect
 * @property {'select'} type - Must be 'select'
 * @property {string} name - The name/key for the filter field
 * @property {string} query - The query parameter name to use when submitting filters
 * @property {string|string[]|React.ReactNode} [label] - The label for the filter field
 * @property {string} [nameFrom] - The column name this filter belongs to
 * @property {Array<{label: string, value: string}>} options - The options for the select field
 * @property {TableCRINGColumnFilterItemParamEnum|Array<TableCRINGColumnFilterItemParamEnum>} [params] - Additional parameters
 * @property {string|string[]|TableCRINGColumnFilterItemResetEnum|Array<TableCRINGColumnFilterItemResetEnum>} [resets] - Fields to reset when this filter changes
 */

/**
 * Filter configuration for autocomplete fields
 *
 * @typedef {Object} TableCRINGColumnFilterItemAutocomplete
 * @property {'autocomplete'} type - Must be 'autocomplete'
 * @property {string} name - The name/key for the filter field
 * @property {string} query - The query parameter name to use when submitting filters
 * @property {string|string[]|React.ReactNode} [label] - The label for the filter field
 * @property {string} [nameFrom] - The column name this filter belongs to
 * @property {Object} autocomplete - Autocomplete configuration
 * @property {TableCRINGColumnFilterItemParamEnum|Array<TableCRINGColumnFilterItemParamEnum>} [params] - Additional parameters
 * @property {string|string[]|TableCRINGColumnFilterItemResetEnum|Array<TableCRINGColumnFilterItemResetEnum>} [resets] - Fields to reset when this filter changes
 */

/**
 * Configuration for a table column filter parameter
 *
 * @typedef {Object} TableCRINGColumnFilterItemParamEnum
 * @property {string} key - The parameter key
 * @property {string|{from: string}} value - The parameter value or a reference to another field
 */

/**
 * Configuration for resetting filter fields
 *
 * @typedef {Object} TableCRINGColumnFilterItemResetEnum
 * @property {string} key - The field name to reset
 * @property {string} value - The value to reset the field to
 */

/**
 * Column filter configuration
 *
 * @typedef {Object} TableCRINGColumnFilters
 * @property {Array<TableCRINGColumnFilterItemText|TableCRINGColumnFilterItemSelect|TableCRINGColumnFilterItemAutocomplete>} [filters] - The filter configurations for this column
 */

/**
 * Pagination configuration for the table
 *
 * @typedef {Object} TableCRINGPaginationProps
 * @property {number} current - The current page number
 * @property {number} limit - The number of items per page
 * @property {number} total - The total number of items across all pages
 * @property {Array<number>} rows - Available page size options
 */

/**
 * Full table column configuration
 *
 * @typedef {TableCRINGColumnPropBase & TableCRINGColumnFilters} TableCRINGColumnProps
 */

/**
 * Main TableCRING component properties
 *
 * @typedef {Object} TableCRINGProps
 * @property {Array<Record<string, any>>} data - The data array to display in the table
 * @property {Array<TableCRINGColumnProps>} columns - The column configurations
 * @property {string} [id='Table-CRING'] - Unique identifier for the table
 * @property {boolean} [isLoading] - Whether the table is in a loading state
 * @property {Record<string, any>} [params] - Current filter/query parameters
 * @property {TableCRINGPaginationProps} [pagination] - Pagination configuration
 * @property {function(Record<string, any>): void} [onClick] - Callback when a row is clicked
 * @property {function(Record<string, any>): void} [onFilter] - Callback when filters are applied
 */

/**
 * Form method provided by react-hook-form
 *
 * @typedef {Object} UseTableCRINGFormMethod
 * @property {Object} formState - The form state
 * @property {Function} handleSubmit - Function to handle form submission
 * @property {Function} reset - Function to reset form values
 * @property {Function} setValue - Function to set a field value
 */

/**
 * Filter hook return type
 *
 * @typedef {Object} UseTableCRINGColumnFilter
 * @property {UseTableCRINGFormMethod} method - The react-hook-form form methods
 * @property {boolean} isOpen - Whether the filter dropdown is currently open
 * @property {string} idFrom - The ID of the column that triggered the filter
 * @property {string} nameFrom - The name of the column that triggered the filter
 * @property {function({status: boolean, idFrom: string, nameFrom: string}): void} onOpen - Function to open/close the filter dropdown
 * @property {function(Record<string, any>): void} onSubmit - Function to submit the filter form
 */

/**
 * Head component properties
 *
 * @typedef {Object} TableCRINGHeadProps
 * @property {string} id - The ID of the column header
 * @property {boolean} isOpen - Whether the filter dropdown is open
 * @property {string} name - The column name
 * @property {string|string[]|React.ReactNode} label - The column label
 * @property {Object} [head] - Props for the TableCell component
 * @property {Array<TableCRINGColumnFilterItemText|TableCRINGColumnFilterItemSelect|TableCRINGColumnFilterItemAutocomplete>} [filters] - Filter configurations
 * @property {Record<string, any>} [params] - Current filter parameters
 * @property {function({status: boolean, idFrom: string, nameFrom: string}): void} onOpen - Function to open/close the filter dropdown
 * @property {function(Record<string, any>): void} onSubmit - Function to submit the filter form
 */

/**
 * Filter dropdown component properties
 *
 * @typedef {Object} TableCRINGHeadFilterProps
 * @property {string} id - The ID of the table
 * @property {string} idFrom - The ID of the column that triggered the filter
 * @property {boolean} isOpen - Whether the filter dropdown is open
 * @property {Array<TableCRINGColumnFilterItemText|TableCRINGColumnFilterItemSelect|TableCRINGColumnFilterItemAutocomplete>} filters - The filter configurations
 * @property {function(Record<string, any>): void} onSubmit - Function to submit the filter form
 */

/**
 * Row component properties
 *
 * @typedef {Object} TableCRINGRowProps
 * @property {number} index - The row index
 * @property {Array<TableCRINGColumnProps>} columns - The column configurations
 * @property {Record<string, any>} data - The row data
 * @property {Record<string, any>} [params] - Current filter parameters
 * @property {function(Record<string, any>): void} [onClick] - Callback when the row is clicked
 */

/**
 * Cell component properties
 *
 * @typedef {Object} TableCRINGRowCellProps
 * @property {number} index - The row index
 * @property {TableCRINGColumnProps} column - The column configuration
 * @property {Record<string, any>} data - The row data
 * @property {Record<string, any>} [params] - Current filter parameters
 */

/**
 * Pagination component properties
 *
 * @typedef {Object} TableCRINGPaginationComponentProps
 * @property {string} id - The ID for the pagination component
 * @property {number} current - The current page number
 * @property {number} limit - The number of items per page
 * @property {number} total - The total number of items
 * @property {Array<number>} rows - Available page size options
 * @property {function(number): void} onPage - Callback when page is changed
 */

/**
 * Loader component properties
 *
 * @typedef {Object} TableCRINGLoaderProps
 * @property {boolean} [isLoading] - Whether the table is in a loading state
 * @property {Array<string>} columns - The column names
 * @property {number} dataTotal - The total number of data items
 * @property {React.ReactNode} children - The table content to render when not loading
 */

// This file is for documentation purposes only
