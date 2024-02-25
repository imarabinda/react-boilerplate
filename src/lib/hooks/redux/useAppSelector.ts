import { ReduxRootState } from "redux/store";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useSelector } from "react-redux";

/* This code is defining a custom hook called `useAppSelector` that is used to select data from the
Redux store in a TypeScript project. It is using the `TypedUseSelectorHook` type from the
`react-redux` library to ensure that the selected data is correctly typed. The `useSelector`
function from `react-redux` is being assigned to `useAppSelector`, which can then be imported and
used in other parts of the project to access data from the Redux store. */

const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;
export default useAppSelector;
