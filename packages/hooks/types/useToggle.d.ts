declare function useToggle<InitialState = boolean>(
  initialState?: InitialState
): [InitialState, (value?: InitialState) => void];

export default useToggle;
