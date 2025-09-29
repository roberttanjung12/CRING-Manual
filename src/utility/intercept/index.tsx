import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { createRoot } from 'react-dom/client';
import theme from '@/@dront/theme';
import InterceptModal from './components/Modal';
import type { OnInterceptProps } from './type';

interface Props extends OnInterceptProps {
  /**
   * status of intercept, activity will be allowed if status is false.
   * @type {boolean}
   * @default true
   */
  isIntercept?: boolean;
  onCancel?: () => void;
}

/**
 * A utility that's used for intercepting activity.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {void}
 */
const onIntercept = (onNext: () => void, props?: Props): void => {
  if (props?.isIntercept) {
    const getApp = document.getElementById('profile-menu');
    const IDElement = `id${new Date().getTime()}`;

    if (getApp) {
      const create = document.createElement('div');

      create.setAttribute('id', IDElement);
      getApp.appendChild(create);

      const root = createRoot(create);

      root.render(
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme('light')}>
            <CssBaseline />
            <InterceptModal
              IDElement={IDElement}
              icon={props?.icon}
              title={props?.title}
              message={props?.message}
              buttonCancel={props?.buttonCancel}
              buttonNext={props?.buttonNext}
              onCancel={props?.onCancel}
              onNext={onNext}
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
      );
    }
  } else onNext();
};

export default onIntercept;
