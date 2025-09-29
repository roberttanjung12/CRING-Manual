import type { ThemeOptions } from '@mui/material';

const themeTokenComponents: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: `
        @font-face {
          font-family: 'ProximaNova';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('ProximaNova'), local('ProximaNova'), url('/assets/fonts/Proxima-Nova--Regular.otf') format('opentype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius
      })
    }
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 12,
        boxShadow: '1px 2px 6px 0px rgba(19, 35, 89, 0.08)',
        '& .MuiCardContent-root:last-of-type': {
          paddingBottom: 16
        }
      })
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        minWidth: '176px',
        borderRadius: 5,
        textTransform: 'capitalize',
        '&:disabled': {
          backgroundColor: '#DEDEDE',
          color: '#767474'
        }
      }
    },
    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          backgroundColor: '#681399',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#0e245c' }
        }
      },
      {
        props: { variant: 'outlined', color: 'primary' },
        style: {
          backgroundColor: '#ffffff',
          borderColor: '#681399',
          color: '#681399',
          '&:hover': {
            backgroundColor: '#681399',
            color: 'white'
          }
        }
      },
      {
        props: { variant: 'contained', color: 'secondary' },
        style: {
          backgroundColor: '#EA3C30',
          color: '#ffffff'
        }
      },
      {
        props: { variant: 'outlined', color: 'secondary' },
        style: {
          backgroundColor: '#ffffff',
          borderColor: '#EA3C30',
          color: '#EA3C30',
          '&:hover': {
            backgroundColor: '#EA3C30',
            color: 'white'
          }
        }
      },
      {
        props: { variant: 'contained', color: 'success' },
        style: {
          background: '#E3FFE2',
          border: '1px solid #4CC34A',
          color: '#515151',
          '.MuiSvgIcon-root': {
            color: '#4CC34A'
          },
          '&:hover': {
            backgroundColor: '#4CC34A',
            color: 'white'
          }
        }
      }
    ]
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        background: 'transparent !important',
        border: 'none !important',
        '&.--pagination .MuiOutlinedInput-root': { minWidth: '0' },
        '&.--no-border .MuiOutlinedInput-root': { border: 'none' },
        '&.--no-border .MuiOutlinedInput-notchedOutline': { border: 'none' }
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: '125px',
        height: '40px',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.background.default}`,
        borderRadius: '10px',
        '&.--pagination': { minWidth: '0' },
        '&:hover': { borderColor: '#6F88C6' },
        '&:focus': { borderColor: '#6F88C6' },
        '&.--no-border': { border: 'none' },
        '&.--no-border .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { border: 'none' }
      }),
      multiline: {
        height: 'auto'
      }
    }
  },
  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: '40px',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.background.default}`
      })
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 9
      }
    }
  },
  MuiLink: {
    styleOverrides: {
      root: {
        fontWeight: 400
      }
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        position: 'relative',
        paddingTop: '30px',
        paddingBottom: '30px',
        '& .nav-item-icon': { color: '#A09E9E !important' },
        '& .nav-item-text': { color: '#A09E9E !important' },
        '&:hover .nav-item-icon': { color: '#fff !important' },
        '&:hover .nav-item-text': { color: '#fff !important' },
        '&.active .nav-item-icon': { color: '#fff !important' },
        '&.active .nav-item-text': { color: '#fff !important' },
        '&:before': {
          content: '""',
          display: 'none',
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '7px',
          background: '#FFFFFF',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px'
        },
        '&.active:before': { display: 'block' }
      }
    }
  },
  MuiCollapse: {
    styleOverrides: {
      wrapper: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px'
      }),
      root: {
        '&.collapse-children': {
          display: 'flex',
          flexWrap: 'nowrap',
          paddingLeft: '15px',
          backgroundColor: 'white',
          borderRadius: '5px',
          textAlign: 'left'
        },
        '&.collapse-children .sub-menu-gap': {
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '15px',
          backgroundColor: 'transparent'
        },
        '& .nav-item-text': { textAlign: 'left' },
        '& .MuiListItem-root.rounded-menu': { padding: '15px 0 15px 15px' },
        '& .MuiListItem-root': { padding: '15px 0 15px 15px' },
        '& .MuiListItem-root.active:before': { display: 'none' },
        '&.table-detail .MuiCollapse-wrapper': { backgroundColor: 'transparent' }
      }
    }
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: '#681399'
        }
      }
    }
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        background: '#FFFFFF',
        boxShadow: '0 0 10px #A09E9E1A',
        borderRadius: '5px',
        overflowX: 'unset'
      }
    }
  },
  MuiTable: {
    styleOverrides: {
      root: {
        minHeight: '100px',
        fontSize: '15px',
        '& th': { fontWeight: 'bold' }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        maxWidth: '450px',
        verticalAlign: 'top',
        paddingTop: '12.5px',
        paddingBottom: '5.5px',
        borderRight: '1px solid #7388C180',
        borderBottomColor: 'transparent',
        fontSize: '13px',
        color: '#656262',
        '&.MuiTableCell-head': { paddingBottom: '12.5px', fontWeight: 'bold' },
        '&:last-child': { borderRight: 'none' }
      },
      head: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      })
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        backgroundColor: 'white',
        transition: 'all .25s ease-in-out',
        '&.--hover:hover > .MuiTableCell-root': {
          background: '#dbdee7',
          cursor: 'pointer'
        },
        '&:not(.--row-child):nth-of-type(odd)': {
          backgroundColor: '#F3F6F9'
        },
        '&.--clickable:hover': {
          backgroundColor: '#adc1f4 !important',
          cursor: 'pointer'
        }
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: '15px 25px',
        borderRadius: '12px'
      }
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: '0',
        marginBottom: '15px',
        paddingBottom: '5px',
        borderBottom: '2px solid #8F8F8F'
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '0'
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '10px',
        marginTop: '15px',
        borderTop: '2px solid #8F8F8F'
      }
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: '74px',
        height: '50px',
        opacity: '1'
      },
      switchBase: {
        top: '6px',
        left: '7px',
        opacity: '1',
        '&.Mui-checked .MuiSwitch-thumb': {
          color: '#14348F'
        },
        '&.Mui-checked ~ .MuiSwitch-track': {
          opacity: '1',
          backgroundColor: 'white',
          borderColor: '#14348F'
        },
        '&.Mui-disabled ~ .MuiSwitch-track': {
          borderColor: '#8F8F8F'
        },
        '&.Mui-disabled.Mui-checked ~ .MuiSwitch-track': {
          borderColor: '#C6D1F2'
        },
        '&.Mui-disabled.Mui-checked .MuiSwitch-thumb': {
          color: '#C6D1F2'
        }
      },
      track: {
        borderRadius: '100px',
        border: '2px solid #8F8F8F',
        backgroundColor: 'white',
        opacity: '1'
      },
      thumb: {
        opacity: '1',
        color: '#8F8F8F'
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        '&.--new': {
          '& .MuiTab-root': {
            minWidth: '200px',
            background: '#FFFFFF',
            borderBottom: '1px solid #7388C180',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '40px',
            boxShadow: '0 0 6px #0000000D',
            color: 'black'
          },
          '& .MuiTab-root.Mui-selected': {
            background: '#681399',
            color: '#FFFFFF'
          },
          '& .MuiTabs-indicator': { display: 'none' }
        }
      },
      flexContainerVertical: {
        '& .MuiButtonBase-root': {
          alignItems: 'start',
          whiteSpace: 'pre'
        }
      }
    }
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '&.--head-grey .MuiTableCell-root': {
          backgroundColor: '#681399',
          color: 'white'
        }
      }
    }
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          paddingTop: '0',
          paddingBottom: '0'
        }
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& [disabled]': {
          cursor: 'no-drop'
        }
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: '1px solid #8F8F8F',
        borderRadius: '8px',
        '&.Mui-disabled': {
          backgroundColor: '#dedede'
        }
      },
      formControl: {
        '&.Mui-disabled': {
          backgroundColor: '#dedede'
        }
      }
    }
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: '4px'
      },
      icon: {
        color: '#656262 !important'
      },
      message: {
        paddingTop: '9px',
        paddingBottom: '9px',
        fontSize: '14px',
        color: '#656262',
        fontWeight: '400'
      }
    },
    variants: [
      {
        props: { severity: 'info' },
        style: {
          background: '#C6D1F2'
        }
      }
    ]
  },
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState }) => {
        const overrides = {
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(108, 108, 108, 0.2)'
        };

        if (ownerState.color === 'primary') overrides.backgroundColor = 'rgba(10, 71, 204, 0.2)';
        else if (ownerState.color === 'success') overrides.backgroundColor = 'rgba(22, 126, 60, 0.2)';
        else if (ownerState.color === 'warning') overrides.backgroundColor = 'rgba(231, 209, 15, 0.2)';
        else if (ownerState.color === 'secondary') overrides.backgroundColor = 'rgba(198, 37, 37, 0.2)';

        return overrides;
      },
      label: ({ ownerState }) => {
        const overrides = {
          padding: '0',
          color: '#474747',
          fontWeight: '600'
        };

        if (ownerState.color === 'primary') overrides.color = '#0a47cc';
        else if (ownerState.color === 'success') overrides.color = '#167E3C';
        else if (ownerState.color === 'warning') overrides.color = '#DBAD0A';
        else if (ownerState.color === 'secondary') overrides.color = '#C62525';

        return overrides;
      },
      icon: ({ ownerState }) => {
        const overrides = {
          marginRight: '0.25rem',
          marginLeft: 0,
          color: '#474747'
        };

        if (ownerState.color === 'primary') overrides.color = '#0a47cc';
        else if (ownerState.color === 'success') overrides.color = '#167E3C';
        else if (ownerState.color === 'warning') overrides.color = '#DBAD0A';
        else if (ownerState.color === 'secondary') overrides.color = '#C62525';

        return overrides;
      }
    }
  },
  MuiBadge: {
    styleOverrides: {
      colorWarning: ({ theme }) => ({
        backgroundColor: theme.palette.warning.dark
      })
    },
    variants: [
      {
        props: { color: 'secondary' },
        style: ({ theme }) => ({
          '& .MuiBadge-badge': {
            backgroundColor: theme.palette.secondary.contrastText
          }
        })
      },
      {
        props: { color: 'default' },
        style: {
          '.MuiBadge-badge': {
            backgroundColor: '#8F8F8F'
          }
        }
      }
    ]
  }
};

export default themeTokenComponents;
