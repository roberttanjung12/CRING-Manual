import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createRoot } from 'react-dom/client';
import type { TypePermission, TypePermissionHook, TypePermissionHookOnAllowProp } from './type';
import { useAccessControl } from '../..';
import { useRegistry } from '../Registry';

/**
 * A component that's designed for showing casl enabler.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @property {Function} onAllow is used for checker function
 *
 * @returns {React.JSX}
 */
const usePermission = (props: { on?: string; path?: string } = { on: '', path: '' }): Readonly<TypePermissionHook> => {
  const { on: onParam, path: pathParam } = props;

  const { path: pathRegis } = useRegistry();

  const accessControl: any = useAccessControl();

  const isAllow = ({ on, path }: TypePermission): boolean => {
    const newPath = path || pathParam || pathRegis;
    const newOn = (on || onParam) ?? 'page';

    return accessControl.can(newPath, newOn);
  };

  const onAllow = ({ on, path, callback }: TypePermissionHookOnAllowProp): void => {
    const newPath = path || pathParam || pathRegis;
    const newOn = (on || onParam) ?? 'page';

    if (accessControl.can(newPath, newOn)) {
      callback();
    } else {
      const container = document.getElementById('permission-modal');

      if (container) {
        const root = createRoot(container);

        root.render(
          <Dialog open aria-describedby="alert-dialog-slide-description">
            <DialogTitle>Ijin tidak diberikan.</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Pastikan semua fitur yang telah dibuat memiliki ijin yang sesuai.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        );
      }
    }
  };

  return {
    isAllow,
    onAllow
  };
};

export default usePermission;
