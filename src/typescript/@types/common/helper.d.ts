//Do not include any import or export
type GenerateUnionType<T> = T extends Record<string, infer U>
  ? U extends string
    ? U
    : GenerateUnionType<U>
  : T[keyof T];

//Do not include any import or export
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

type EnumToPipes<T, K> = `${Extract<T, K>}` extends `${infer N extends K}`
  ? N
  : never;

type ValueOf<T> = T[keyof T];

type AllValuesOf<T> = T extends unknown ? T[keyof T] : never;

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type SetTimeoutReturnType = ReturnType<typeof setTimeout>;

type Undefinable<T> = undefined | T;
type Nullable<T> = null | T;

type CommonSVGProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

interface DocumentWithFullscreen extends HTMLDocument {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

interface DocumentElementWithFullscreen extends HTMLElement {
  requestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
}
