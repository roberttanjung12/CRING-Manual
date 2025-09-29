import { useMemo, type ReactNode } from 'react';
import { type SxProps, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface Type {
  opt: {
    value: string;
    text: string;
  }[];
  sx: SxProps;
  onChange: (arg: string | string[]) => void;
  values?: string[];
  placeholder?: string;
}

/**
 * A component that's designed for showing multiple select.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const MultipleSelectCheckmarks = ({ opt, values, placeholder, sx, onChange }: Type): Readonly<ReactNode> => {
  const valueConvert = useMemo<string[]>(() => (Array.isArray(values) ? values : []), [values]);

  return (
    <Select<string[]>
      multiple
      displayEmpty
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250
          }
        }
      }}
      renderValue={selected =>
        Array.isArray(selected) && selected.length ? (
          selected.join(', ')
        ) : (
          <Typography color="lightgray">{placeholder}</Typography>
        )
      }
      sx={sx}
      value={valueConvert}
      onChange={(event: SelectChangeEvent<string[]>) => onChange(event.target.value)}
    >
      {opt.map(item => (
        <MenuItem key={item.value} value={item.value}>
          <Checkbox checked={valueConvert.indexOf(item.value) > -1} />
          <ListItemText primary={item.text} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultipleSelectCheckmarks;
