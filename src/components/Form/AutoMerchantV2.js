import { useState, useEffect, useCallback } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import isEmpty from 'is-empty';
import { oneOfType, func, object, string, number } from 'prop-types';
import { onGetOneMngMcnt, onGetMngMcnt } from '../../services/manage-merchant';

const AutoMerchantV2 = ({
  minWidth = '175px',
  placeholder = '',
  query = {},
  value = { value: '', text: '' },
  onChange = null
}) => {
  // group: state
  const [opt, setOpt] = useState([]);

  // group: get
  const getOptValue = useCallback(async () => {
    const params = {};
    let setOpt2 = [];
    let send1 = null;
    let send2 = null;

    if (query?.parentOnly) params.parentOnly = query?.parentOnly;

    if (value?.id) {
      send1 = await onGetOneMngMcnt({ id: value?.id });

      if (send1?.status) {
        const setValue2 = { value: send1.data.data.id, text: send1.data.data.name };

        setOpt2 = [setValue2];
      }
    } else if (value?.text) {
      send2 = await onGetMngMcnt({ limit: 15, name: value?.text, ...params });

      if (send2?.status) {
        if (!isEmpty(send2.data.data)) {
          send2.data.data.forEach(d => {
            setOpt2.push({ value: d.id, text: d.name });
          });
        }
      }
    }

    setOpt(setOpt2);
  }, [query?.parentOnly, value?.id, value?.text]);

  const getOpt = async (value2 = '') => {
    const set2 = [];
    const send = await onGetMngMcnt({ limit: 15, name: value2, ...query });

    if (send.status) {
      if (!isEmpty(send.data.data)) {
        send.data.data.forEach(d => {
          set2.push({ value: d.id, text: d.name });
        });
      }
    }

    setOpt(set2);
  };

  // group: action
  const onChangeValue = value2 => {
    onChange(value2);
  };

  // group: watch
  useEffect(() => {
    getOptValue();
  }, [getOptValue]);

  return (
    <Box id="filter:auto-merchant">
      <Autocomplete
        getOptionKey={({ value }) => value}
        getOptionLabel={opt2 => opt2.text || ''}
        isOptionEqualToValue={(option, value2) => option.value === value2.value}
        options={opt}
        renderInput={params => <TextField {...params} className="--no-border" placeholder={placeholder} />}
        sx={{
          minWidth,
          '& .MuiOutlinedInput-root': {
            paddingTop: '0',
            paddingBottom: '0'
          }
        }}
        value={value}
        onChange={(e, newVal) => onChangeValue(newVal)}
        onKeyUp={e => getOpt(e.target.value)}
        onOpen={() => getOpt()}
      />
    </Box>
  );
};

AutoMerchantV2.propTypes = {
  minWidth: oneOfType([number, string]),
  placeholder: string,
  query: object,
  value: oneOfType([object, string]),
  onChange: func
};

export default AutoMerchantV2;
