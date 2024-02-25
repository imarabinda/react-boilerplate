import { useCallback, useState } from "react";

type useAnchorElProps<T = HTMLElement> = {
  onClick?: (event?: React.MouseEvent<T>) => void;
  onClose?: () => void;
};
export default function useAnchorEl<T = HTMLElement>(
  props?: useAnchorElProps<T>
) {
  const [anchorEl, setAnchorEl] = useState<Nullable<T>>(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event?: React.MouseEvent<T>) => {
      setAnchorEl(event?.currentTarget || null);
      props?.onClick?.(event);
    },
    [props]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    props?.onClose?.();
  }, [props]);

  return { open, handleClose, handleClick, anchorEl };
}
