interface TypeSearchPagePropShapeChild {
  title: string;
  path: string;
  children: string;
  target: string;
}

interface TypeSearchPageProps {
  localName: string;
  menu: Array<{ [key: string]: any }>;
  shape: TypeSearchPagePropShapeChild;
}

interface TypeSearchPageMenu {
  title: string;
  path: string;
  target: '_self' | '_blank';
  children?: Array<TypeSearchPageMenu>;
}

interface TypeSearchPageLocal {
  path: string;
  score: number;
}

interface TypeSearchPageItem {
  label: Array<string>;
  path: string;
  score: number;
}

interface TypeSearchPageUIItem {
  label: Array<string>;
  path: string;
  search: string;
}

interface TypeSearchPageHookReturn {
  search: string;
  list: Array<TypeSearchPageItem>;
  options: Array<TypeSearchPageItem>;
  onDefine: () => void;
  onChange: (search: string) => void;
}

export type {
  TypeSearchPagePropShapeChild,
  TypeSearchPageProps,
  TypeSearchPageMenu,
  TypeSearchPageLocal,
  TypeSearchPageItem,
  TypeSearchPageUIItem,
  TypeSearchPageHookReturn
};

export default TypeSearchPageHookReturn;
