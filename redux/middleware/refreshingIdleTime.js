export const refreshingIdleTime = (store) => (next) => (action) => {
  console.log("Middleware triggered", action);
  next(action);
};
