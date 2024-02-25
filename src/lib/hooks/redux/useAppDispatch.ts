import { ReduxAppDispatch } from "redux/store";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from "react-redux";

/* This code is defining a custom hook called `useAppDispatch` that returns the `ReduxAppDispatch` type
from the `useDispatch` hook provided by the `react-redux` library. The `ReduxAppDispatch` type is a
custom type that extends the `Dispatch` type from the `redux` library and includes additional action
creators specific to the application. The `useAppDispatch` hook can be used in functional components
to get access to the `dispatch` function from the Redux store. The `export default useAppDispatch`
statement exports the `useAppDispatch` hook so that it can be imported and used in other parts of
the application. */

const useAppDispatch: () => ReduxAppDispatch = useDispatch;
export default useAppDispatch;
