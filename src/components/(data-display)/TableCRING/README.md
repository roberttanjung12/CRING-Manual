# TableCRING Component

A powerful, customizable data table component for displaying and interacting with tabular data, designed for the CRING application.

## Proof of Concept

The TableCRING component provides a comprehensive solution for displaying tabular data with advanced features like:

- **Drag-to-scroll** - Uses react-indiana-drag-scroll for smooth horizontal scrolling
- **Row expansion** - Support for expandable rows with custom content
- **Action menus** - Configurable action buttons for each row with icon support
- **Joined columns** - Group related columns together for better organization
- **Linked filters** - Create dependent filters where one filter's value affects another
- **Indonesian localization** - Pagination text in Indonesian language ("Menampilkan 1-10 dari 100 data")
- **Custom styling** - Full MUI styling support for headers and cells

## Features

- 🔍 **Advanced Filtering** - Column-based filtering with text, select, date, date-range, and autocomplete options
- 📊 **Pagination** - Built-in pagination with customizable page sizes and "go to page" function
- 🔄 **Data Loading States** - Visual loading indicators during data fetches
- 📱 **Responsive Design** - Horizontal scrolling for mobile devices
- 🎨 **Customizable Cells** - Define custom content renderers for each cell
- 🖱️ **Interactive Rows** - Click handlers for row interaction
- 🛠️ **Action Menu** - Configurable dropdown menu for row actions

## Basic Usage

```tsx
import TableCRING from '@/components/(data-display)/TableCRING';

const MyTable = () => {
  const columns = [
    {
      name: 'id',
      label: 'ID',
      isOpen: true
    },
    {
      name: 'name',
      label: 'Name',
      filters: [
        {
          type: 'text',
          name: 'name',
          query: 'name'
        }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      filters: [
        {
          type: 'select',
          name: 'status',
          query: 'status',
          options: [
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' }
          ]
        }
      ]
    }
  ];

  const data = [
    { id: 1, name: 'Item 1', status: 'ACTIVE' },
    { id: 2, name: 'Item 2', status: 'INACTIVE' }
  ];

  const handleFilter = filters => {
    console.log('Applied filters:', filters);
    // Fetch filtered data
  };

  const handleRowClick = row => {
    console.log('Row clicked:', row);
    // Handle row click
  };

  return (
    <TableCRING
      data={data}
      columns={columns}
      id="my-table"
      isLoading={false}
      params={{}}
      pagination={{
        current: 1,
        limit: 10,
        rows: [5, 10, 25, 50],
        total: 100
      }}
      onClick={handleRowClick}
      onFilter={handleFilter}
    />
  );
};
```

## API Reference

### TableCRING Props

| Prop         | Type                                       | Required | Default       | Description                                   |
| ------------ | ------------------------------------------ | -------- | ------------- | --------------------------------------------- |
| `data`       | `Array<Record<string, any>>`               | Yes      | -             | The data array to display in the table        |
| `columns`    | `Array<TableCRINGColumnProps>`             | Yes      | -             | Column configuration for the table            |
| `id`         | `string`                                   | No       | 'Table-CRING' | Unique identifier for the table               |
| `isLoading`  | `boolean`                                  | No       | `false`       | Whether data is currently loading             |
| `params`     | `object`                                   | No       | `{}`          | Current filter parameters                     |
| `pagination` | `TableCRINGPaginationProps`                | No       | -             | Pagination configuration                      |
| `onClick`    | `(row: Record<string, any>) => void`       | No       | -             | Callback when a row is clicked                |
| `onFilter`   | `(filters: Record<string, any>) => void`   | No       | -             | Callback when filters are applied             |
| `expanded`   | `(data: Record<string, any>) => ReactNode` | No       | -             | Function to render expanded content for a row |
| `actions`    | `Array<TableCRINGActionProps>`             | No       | -             | Action menu items for each row                |

### Column Configuration

Each column object can have the following properties:

| Property  | Type                              | Required | Default | Description                                    |
| --------- | --------------------------------- | -------- | ------- | ---------------------------------------------- |
| `name`    | `string`                          | Yes      | -       | Unique identifier for the column               |
| `label`   | `string \| string[] \| ReactNode` | Yes      | -       | Column header display text/component           |
| `isOpen`  | `boolean`                         | No       | `true`  | Whether the column is visible                  |
| `join`    | `string`                          | No       | -       | Join identifier for grouping related columns   |
| `head`    | `TableCellProps`                  | No       | -       | Props for the MUI TableCell in header          |
| `cell`    | `TableCellProps`                  | No       | -       | Props for the MUI TableCell in rows            |
| `content` | `(row) => ReactNode`              | No       | -       | Custom render function for cell content        |
| `filters` | `Array<FilterConfig>`             | No       | -       | Filter configurations for this column          |
| `ability` | `TableCRINGColumnPropAbilityEnum` | No       | -       | Special cell abilities (copy, currency format) |

### Filter Configuration

Each filter can be one of five types:

#### Text Filter

```tsx
{
  type: 'text',
  name: 'search',
  query: 'search',
  label: 'Search',
  inputType: 'text' // Optional HTML input type
}
```

#### Select Filter

```tsx
{
  type: 'select',
  name: 'status',
  query: 'status',
  label: 'Status',
  options: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ]
}
```

#### Autocomplete Filter

```tsx
{
  type: 'autocomplete',
  name: 'user',
  query: 'user_id',
  label: 'User',
  autocomplete: {
    service: userService.getUsers,
    getOptionLabel: (option) => option.name,
    getOptionValue: (option) => option.id
  }
}
```

#### Date Filter

```tsx
{
  type: 'date',
  name: 'createdDate',
  query: 'created_date',
  label: 'Created Date',
  date: {
    format: 'yyyy-MM-dd', // Optional date format
    minDate: new Date('2020-01-01'), // Optional min date
    maxDate: new Date() // Optional max date
  }
}
```

#### Date Range Filter

```tsx
{
  type: 'date-range',
  name: 'dateRange',
  query: 'date_range',
  label: 'Date Range',
  date: {
    format: 'yyyy-MM-dd', // Optional date format
    minDate: new Date('2020-01-01'), // Optional min date
    maxDate: new Date() // Optional max date
  }
}
```

## Advanced Usage

### Custom Cell Rendering

You can customize how cell content is rendered using the `content` property:

```tsx
{
  name: 'status',
  label: 'Status',
  content: (row) => (
    <Chip
      label={row.status}
      color={row.status === 'ACTIVE' ? 'success' : 'error'}
    />
  )
}
```

### Expandable Rows

You can create expandable rows with custom content using the `expanded` property:

```tsx
<TableCRING
  data={data}
  columns={columns}
  expanded={row => (
    <Box p={2} bgcolor="background.paper">
      <Typography variant="h6">{row.name} Details</Typography>
      <pre>{JSON.stringify(row, null, 2)}</pre>
    </Box>
  )}
/>
```

### Row Actions

You can add action buttons to each row:

```tsx
const actions = [
  {
    label: 'Edit',
    icon: EditIcon,
    onClick: row => handleEdit(row)
  },
  {
    label: 'Delete',
    icon: DeleteIcon,
    onClick: row => handleDelete(row.id)
  },
  {
    label: 'View Details',
    icon: VisibilityIcon,
    href: row => `/details/${row.id}`
  }
];

<TableCRING data={data} columns={columns} actions={actions} />;
```

### Special Cell Abilities

You can add special behaviors to cells like copy functionality or currency formatting:

```tsx
{
  name: 'transactionId',
  label: 'Transaction ID',
  ability: {
    copy: true  // Makes the cell content copyable with a click
  }
},
{
  name: 'amount',
  label: 'Amount',
  ability: {
    currency: 'Rp' // Formats the cell content as Indonesian Rupiah
  }
}
```

### Linked Filters

You can create linked filters where one filter's value affects another:

```tsx
{
  name: 'province',
  label: 'Province',
  filters: [
    {
      type: 'select',
      name: 'province',
      query: 'province_id',
      options: provinces
    }
  ]
},
{
  name: 'city',
  label: 'City',
  filters: [
    {
      type: 'select',
      name: 'city',
      query: 'city_id',
      options: cities,
      params: {
        key: 'province_id',
        value: { from: 'province' } // Link to province filter value
      }
    }
  ]
}
```

### Reset Filter Dependencies

You can define which filters should be reset when a filter value changes:

```tsx
{
  type: 'select',
  name: 'province',
  query: 'province_id',
  options: provinces,
  resets: ['city', 'district'] // Reset city and district filters when province changes
}
```

### Custom Styling

You can customize the styling of header and data cells using MUI's TableCell props:

```tsx
{
  name: 'amount',
  label: 'Amount',
  head: {
    align: 'right',
    sx: { fontWeight: 'bold' }
  },
  cell: {
    align: 'right',
    sx: { color: 'primary.main' }
  }
}
```

### Joined Columns

You can group related columns together using the `join` property:

```tsx
{
  name: 'firstName',
  label: 'First Name',
  join: 'name' // Join identifier
},
{
  name: 'lastName',
  label: 'Last Name',
  join: 'name' // Same join identifier
}
```

The columns with the same `join` value will be displayed as a single column with combined labels ("First Name / Last Name").

### Action Configuration

Actions are displayed as a dropdown menu on each row. Each action can have the following properties:

```tsx
{
  label: 'Edit', // Action name displayed in the menu
  icon: EditIcon, // Optional MUI icon component
  href: (row) => `/edit/${row.id}`, // Optional function that returns a URL
  onClick: (row) => handleEdit(row) // Optional click handler function
}
```

## Component Structure

The TableCRING component is composed of several sub-components:

- **TableCRING** - Main component that orchestrates all sub-components
- **TableCRINGHead** - Header cell component with filter trigger
- **TableCRINGHeadFilter** - Filter dropdown for columns
- **TableCRINGRow** - Row component that renders cells
- **TableCRINGRowCell** - Individual cell component
- **TableCRINGAction** - Row action menu component
- **TableCRINGActionItem** - Individual action item in the menu
- **TableCRINGPagination** - Pagination controls
- **TableCRINGLoader** - Loading state handler

## Best Practices

1. **Column Names**: Use consistent naming for column `name` property as it's used for data mapping
2. **Filter Naming**: Keep filter `name` and `query` values aligned with your API's query parameters
3. **Performance**: For large datasets, implement server-side pagination and filtering
4. **Responsive Design**: Test the table on different screen sizes to ensure good mobile experience
5. **Accessibility**: Provide meaningful labels for all interactive elements

## Troubleshooting

### Common Issues

1. **Filter not working**:
   - Ensure the `onFilter` callback is implemented and fetching filtered data
   - Check that filter names match the expected query parameters in your API
   - Verify that linked filters have the correct `params` configuration

2. **No data showing**:
   - Check if `data` array is empty or if there's a data type mismatch
   - Verify that column `name` properties match the property names in your data objects
   - Check if all columns have `isOpen: false` which would hide all columns

3. **Filter dropdown misaligned**:
   - Check if the table is inside a container with `position: relative`
   - The filter component uses absolute positioning with zIndex: 800

4. **Expandable rows not working**:
   - Ensure that the `expanded` prop is a function that returns a ReactNode
   - Check that your row data contains the necessary properties for the expanded content

5. **Pagination issues**:
   - Verify that the `pagination` object contains all required properties: `current`, `limit`, `rows`, and `total`
   - Make sure your `onFilter` handler is updating the page parameter correctly

6. **Actions not appearing**:
   - Confirm that the `actions` array contains objects with at least the `label` property
   - For action links (`href`), ensure the function returns a valid URL string

If you encounter any bugs or issues, please report them to the development team.
