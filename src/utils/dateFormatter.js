import moment from 'moment';

// Added a wrapper around moent.js because of some weirdness with date string formatting.
const dateFormatter = strDate => moment(new Date(strDate).toISOString());

export default dateFormatter;
