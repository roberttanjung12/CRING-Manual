import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';

const RHFRupiahInputFieldRender = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 2 }}>
              Rp
            </InputAdornment>
          )
        }
      }}
      placeholder="Masukkan jumlah nominal"
      {...props}
    />
  );
};

export default RHFRupiahInputFieldRender;
