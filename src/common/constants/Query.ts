export const querySQL = {
  GET_DATE_SYS: 'select current_timestamp as date_sys;',
  GET_CIVILITE_BETWEEN_ID: 'select * from t_civilite where id between @0 and @1;'
};
