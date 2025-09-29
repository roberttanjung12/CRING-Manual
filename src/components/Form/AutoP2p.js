import { useState, useEffect, useCallback } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import { onGetSummaryP2pLending } from '../../services/inv-pp-len';

const AutoP2p = ({ query = {}, value = '', onChange = null }) => {
  // group: state
  const [opt, setOpt] = useState([]);
  const [fdP2p, setFdP2p] = useState('');

  // group: get
  const getOptValue = useCallback(
    async value2 => {
      const setOpt2 = [];

      const send = await onGetSummaryP2pLending({ limit: 15, companyId: value2, ...query });

      if (send.status) {
        if (!isEmpty(send.data.data)) {
          const find = send.data.data.find(f => f.companyId === value2);

          if (!isEmpty(find)) setFdP2p({ value: find.companyId, text: value2 });
          else setFdP2p('');

          send.data.data.forEach(d => {
            setOpt2.push({ value: d.companyId, text: d.companyId });
          });
        }
      }

      setOpt(setOpt2);
    },
    [query]
  );

  const getOpt = async value2 => {
    const set2 = [];
    const send = await onGetSummaryP2pLending({ limit: 15, companyId: value2, ...query });

    if (send.status) {
      if (!isEmpty(send.data.data)) {
        send.data.data.forEach(d => {
          set2.push({ value: d.companyId, text: d.companyId });
        });
      }
    }

    setOpt(set2);
  };

  // group: action
  const onGetOptions = event1 => {
    if (event1 && event1.currentTarget) {
      if (event1.currentTarget.getAttribute('title') !== 'Clear') getOpt(event1.currentTarget.value);
      else onChange(null);
    }
  };

  const onChangeValue = value2 => {
    if (!isEmpty(value2) && !isEmpty(value2.value)) onChange(value2);
  };

  // group: watch
  useEffect(() => {
    return () => {
      setOpt([]);
      setFdP2p('');
    };
  }, []);

  useEffect(() => {
    getOptValue(value);
  }, [getOptValue, value]);

  return (
    <Box id="filter:auto-p2p">
      <Autocomplete
        getOptionLabel={opt2 => opt2.text || ''}
        isOptionEqualToValue={(option, value2) => option.value === value2.value}
        options={opt}
        renderInput={params => <TextField className="--no-border" {...params} />}
        sx={{
          minWidth: '175px',
          '& .MuiOutlinedInput-root': {
            paddingTop: '0',
            paddingBottom: '0'
          }
        }}
        value={fdP2p}
        onChange={(e, newVal) => onChangeValue(newVal)}
        onInputChange={onGetOptions}
        onKeyUp={e => getOpt(e.target.value)}
        onOpen={() => getOpt('')}
      />
    </Box>
  );
};

AutoP2p.propTypes = {
  query: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default AutoP2p;
