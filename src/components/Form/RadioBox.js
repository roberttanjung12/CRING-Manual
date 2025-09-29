import { Box, Grid } from '@mui/material';
import { array, bool, func, number, string } from 'prop-types';

/**
 * A react-hook-form field component for radio box field
 *
 * @param {Boolean} disabled status of disable field
 * @param {String} name name of element
 * @param {String} value value of field
 * @param {Array} options list of option
 * @param {Number} lg width of item grid in large resolution
 * @param {Number} xs width of item grid in xtra small resolution
 * @param {Function} onChange is used for update value
 *
 * @returns {Element} radio box field ui
 */
const RadioBox = ({
  disabled = false,
  name = 'radio-box',
  value = '',
  options = [],
  lg = 6,
  xs = 12,
  onChange = null
}) => {
  return (
    <Grid container spacing={4}>
      {options.map(item => {
        if (item?.isHide) return null;

        return (
          <Grid
            key={item.value}
            size={{
              lg: lg,
              xs: xs
            }}
          >
            <Box position="relative">
              <input
                checked={value === item.value}
                className="radio-box--input"
                disabled={item.isDisabled || disabled}
                name={name}
                type="radio"
                value={item.value}
                onChange={() => onChange(item.value)}
              />
              <Box aria-label="item:skin" className="radio-box--skin" display="flex" flexWrap="nowrap" p={5}>
                <Box aria-label="item:point" className="radio-box--point" pr={5}>
                  <Box className="radio-box--point-child --before">
                    <Box className="radio-box--point-child --after" />
                  </Box>
                </Box>
                <Box aria-label="item:info">
                  <Box aria-label="info:label" sx={{ fontSize: '16px', color: '#091B4D', fontWeight: 'bold' }}>
                    {item.text}
                  </Box>
                  <Box
                    aria-label="info:desc"
                    sx={{
                      color: '#B3B3B3',
                      '& .MuiTable-root': { mt: 2 },
                      '& .MuiTableCell-root': { py: 0, px: 2, borderRight: 'none', fontSize: '12px' }
                    }}
                  >
                    {item.desc}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

RadioBox.propTypes = {
  disabled: bool,
  name: string,
  value: string,
  options: array,
  lg: number,
  xs: number,
  onChange: func
};

export default RadioBox;
