import { map } from 'lodash';

export default function parseErrorsAPI (response) {
  let outputError = '';
  map(response, (errorArr) => {
    map(errorArr, (error) => (outputError += error));
  });
  return outputError;
}
