import { type SyntheticEvent, type ReactNode, useMemo } from 'react';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import type { TypeNavigationTabsProps } from './type';

/**
 * A navigation tabs component that renders Material-UI tabs with custom styling.
 *
 * @param props - The props for the NavigationTabs component
 * @param props.isHideHead - Whether to hide the tab headers
 * @param props.tabs - Array of tab objects containing id, label, content, and isClose properties
 * @param props.tab - The currently active tab id
 * @param props.right - Optional right-side content object with content property
 * @param props.onChange - Callback function called when tab selection changes
 *
 * @returns {React.JSX} A readonly React node containing the tabbed navigation interface
 *
 * @example
 * ```tsx
 * <NavigationTabs
 *   isHideHead={false}
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, isClose: false },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, isClose: false }
 *   ]}
 *   tab="tab1"
 *   right={{ content: <Button>Action</Button> }}
 *   onChange={(tabId) => setActiveTab(tabId)}
 * />
 * ```
 */
const NavigationTabs = ({ isHideHead, tabs, tab, right, onChange }: TypeNavigationTabsProps): Readonly<ReactNode> => {
  const newTabs = useMemo<TypeNavigationTabsProps['tabs']>(() => tabs.filter(item => !item.isClose), [tabs]);

  const onNewChange = (event: SyntheticEvent, newValue: string) => onChange(newValue);

  return (
    <Box>
      <TabContext value={tab}>
        <Box display="flex" justifyContent="space-between" flexWrap="nowrap" columnGap={4}>
          <Box>
            {!isHideHead && (
              <TabList
                aria-label="Navigation Tab"
                onChange={onNewChange}
                sx={{ '.MuiTabs-indicator': { backgroundColor: '#681399' } }}
              >
                {newTabs.map(({ id, label }) => (
                  <Tab
                    key={id}
                    label={label}
                    value={id}
                    sx={{
                      minWidth: 200,
                      padding: '5px 32px 5px 32px',
                      background: ({ palette }) => palette.background.paper,
                      borderRadius: '4px 32px 0px 0px',
                      boxShadow: '1px 2px 6px 0px #13235914',
                      fontSize: 14,
                      color: ({ palette }) => palette.common.black,
                      textTransform: 'capitalize',
                      '&.Mui-selected': {
                        boxShadow: '1px 2px 6px 0px #13235914',
                        backgroundColor: '#681399',
                        color: '#fff'
                      }
                    }}
                  />
                ))}
              </TabList>
            )}
          </Box>
          {right?.content && <Box py={isHideHead ? 2 : 0}>{right?.content}</Box>}
        </Box>
        <Box>
          {newTabs.map(({ id, content }) => (
            <TabPanel key={id} value={id} sx={{ p: 0 }}>
              {content}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};

export default NavigationTabs;
