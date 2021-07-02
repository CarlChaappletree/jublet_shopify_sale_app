export const applicationViewTypes = {
  SET_INTRO_VIEW: 'SET_INTRO_VIEW',
  SET_FORM_VIEW: 'SET_FORM_VIEW',
  SET_POLICY_VIEW: 'SET_POLICY_VIEW',
};
export const applicationViewInitialState = {
  applicationView: applicationViewTypes.SET_INTRO_VIEW,
};
export function applicationViewReducer(state, action) {
  switch (action.type) {
    case applicationViewTypes.SET_INTRO_VIEW:
      return {
        applicationView: applicationViewTypes.SET_INTRO_VIEW,
      };
    case applicationViewTypes.SET_FORM_VIEW:
      return {
        applicationView: applicationViewTypes.SET_FORM_VIEW,
      };
    case applicationViewTypes.SET_POLICY_VIEW:
      return {
        applicationView: applicationViewTypes.SET_POLICY_VIEW,
      };
    default:
      return applicationViewInitialState;
  }
}
