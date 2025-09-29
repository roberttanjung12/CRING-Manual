import { useCallback, useMemo } from 'react';
import { type AbilityTuple, createMongoAbility, type MongoAbility, type MongoQuery } from '@casl/ability';
import useSWRImmutable from 'swr/immutable';
import type {
  AccessControlProviderHookDefine,
  AccessControlProviderHookProp,
  AccessControlProviderHookReturn
} from './type';

/**
 * A hook custom that's used for managing access-control context.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @property {Boolean} accessControl list of access-control that has been defined
 *
 * @returns {AccessControlProviderHookReturn}
 */
const useAccessControlProvider = ({
  from,
  shape
}: AccessControlProviderHookProp): Readonly<AccessControlProviderHookReturn> => {
  const getService = async () => (typeof from?.service === 'function' ? await from.service() : { data: [] });

  const { data } = useSWRImmutable<{ data: Array<{ [key: string]: any }> }>(
    typeof from.service === 'function' && '/get/access-control',
    () => getService()
  );

  const setShape = useCallback(
    (list?: Array<{ [key: string]: any }>) => {
      let set: undefined | Array<AccessControlProviderHookDefine> = undefined;

      const onSet = (newList: Array<{ [key: string]: any }>) => {
        newList.forEach(item => {
          if (shape.children && Array.isArray(item[shape.children]) && item[shape.children].length) {
            onSet(item[shape.children]);
          } else if (Array.isArray(set)) {
            set.push({ action: item[shape.path], subject: [...item[shape.permission], 'page'] });
          }
        });
      };

      if (list?.length) {
        set = [];

        onSet(list);
      }

      return set;
    },
    [shape.children, shape.path, shape.permission]
  );

  const dataService = useMemo<undefined | Array<AccessControlProviderHookDefine>>(
    () => setShape(data?.data),
    [data?.data, setShape]
  );

  const dataStatic = useMemo<undefined | Array<AccessControlProviderHookDefine>>(
    () => setShape(from?.static),
    [from?.static, setShape]
  );

  const accessControl = useMemo<MongoAbility<AbilityTuple, MongoQuery>>(
    () => createMongoAbility([...(dataStatic ?? []), ...(dataService ?? [])]),
    [dataService, dataStatic]
  );

  const hasChecked = useMemo(
    () => Boolean(Array.isArray(dataService) || Array.isArray(dataStatic)),
    [dataService, dataStatic]
  );

  return {
    hasChecked,
    accessControl
  };
};

export default useAccessControlProvider;
