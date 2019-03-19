const signUpInitialState = {
  is: {
    fetching: false,
    ok: false,
    error: false,
  },
  slugIs: {
    fetching: false,
    ok: false,
    error: false,
    message: '',
  },
  alert: {
    message: '',
    className: 'alert-info',
  },
  errors: {},
};

const initialState = {
  is: {
    fetching: false,
    ok: false,
    error: false,
  },
  message: '',
  messages: {},
  info: {},
  auth: {},
  signUp: signUpInitialState,
};


const sessionReducer = () => {
  
};

export default sessionReducer;
