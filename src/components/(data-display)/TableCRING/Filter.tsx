import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Box } from '@mui/material';
import TableCRINGButtonSubmit from './ButtonSubmit';
import P2PMerchantCustomerFormFieldAutocomplete from './FieldAutocomplete';
import P2PMerchantCustomerFormFieldDate from './FieldDate';
import P2PMerchantCustomerFormFieldDateRange from './FieldDateRange';
import P2PMerchantCustomerFormFieldSelect from './FieldSelect';
import P2PMerchantCustomerFormFieldText from './FieldText';
import type { TableCRINGColumnFilterProps } from './typeFilter';

const TableCRINGHeadFilter = ({
  id,
  idFrom,
  isOpen,
  filters,
  onSubmit
}: TableCRINGColumnFilterProps): Readonly<ReactNode> => {
  const refOpen = useRef<HTMLDivElement | null>(null);

  const setupOpen = useCallback(() => {
    const getTable = document.getElementById(id);
    const getParent = document.getElementById(`${idFrom}-button`);

    if (isOpen && getTable?.parentNode && getParent?.parentNode && refOpen.current?.parentNode) {
      const getTableBound = getTable.getBoundingClientRect();
      const elCurrent = refOpen.current.getBoundingClientRect();
      const elParent = getParent.getBoundingClientRect();

      refOpen.current.style.position = 'fixed';
      refOpen.current.style.maxWidth = `${getTableBound.width}px`;
      refOpen.current.style.zIndex = '800';
      refOpen.current.style.top = `${elParent.top + 40}px`;

      let setLeft = elParent.left - elCurrent.width / 2;

      if (setLeft < getTableBound.left) setLeft = getTableBound.left;

      if (setLeft + elCurrent.width > getTableBound.left + getTableBound.width)
        setLeft = getTableBound.left + getTableBound.width - elCurrent.width;

      refOpen.current.style.left = `${setLeft}px`;
    }
  }, [id, idFrom, isOpen]);

  useEffect(() => {
    setupOpen();
    window.addEventListener('scroll', setupOpen);

    return () => {
      window.removeEventListener('scroll', setupOpen);
    };
  }, [setupOpen]);

  return (
    Array.isArray(filters) && (
      <Box ref={refOpen} className="tab-filter --filter-box">
        {isOpen && (
          <Box
            display="flex"
            flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
            columnGap={{ xs: 0, lg: 2 }}
            rowGap={{ xs: 2, lg: 0 }}
            p={2}
            bgcolor={({ palette }) => palette.background.default}
            borderRadius={1}
            boxShadow="2px 4px 4px 0px #0000001A"
          >
            {filters
              .map((item, index) => ({ ...item, key: `K-${index}` }))
              .map(item => (
                <Box key={item.key}>
                  {item.type === 'text' && (
                    <P2PMerchantCustomerFormFieldText
                      total={filters.length}
                      name={item.name}
                      label={item.label}
                      inputType={item.inputType}
                      onSubmit={onSubmit}
                    />
                  )}
                  {item.type === 'select' && (
                    <P2PMerchantCustomerFormFieldSelect
                      total={filters.length}
                      name={item.name}
                      label={item.label}
                      options={item.options}
                      onSubmit={onSubmit}
                    />
                  )}
                  {item.type === 'autocomplete' && (
                    <P2PMerchantCustomerFormFieldAutocomplete
                      total={filters.length}
                      name={item.name}
                      label={item.label}
                      autocomplete={item.autocomplete}
                      onSubmit={onSubmit}
                    />
                  )}
                  {item.type === 'date' && (
                    <P2PMerchantCustomerFormFieldDate
                      total={filters.length}
                      name={item.name}
                      label={item.label}
                      date={item.date}
                      onSubmit={onSubmit}
                    />
                  )}
                  {item.type === 'date-range' && (
                    <P2PMerchantCustomerFormFieldDateRange
                      total={filters.length}
                      name={item.name}
                      label={item.label}
                      date={item.date}
                      onSubmit={onSubmit}
                    />
                  )}
                </Box>
              ))}
            <TableCRINGButtonSubmit total={filters.length} />
          </Box>
        )}
      </Box>
    )
  );
};

export default TableCRINGHeadFilter;
