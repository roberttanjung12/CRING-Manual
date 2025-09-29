import { Typography } from '@mui/material';
import type { Option } from '@/types/option';

const selectedText = (
  selected: string = '',
  list: Option[] = [],
  placeholder: string = '-Pilih-',
  field: 'text' | 'value' = 'text'
) => {
  let set = (
    <Typography component="span" sx={{ color: 'text.disabled' }}>
      {placeholder}
    </Typography>
  );
  const getSelect = list.find(find => find.value === selected);

  if (getSelect) {
    set = (
      <Typography component="span" sx={{ color: 'text.primary' }}>
        {getSelect[field]}
      </Typography>
    );
  }

  return set;
};

export default selectedText;
