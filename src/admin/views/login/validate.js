export const myCustomValidator = (value) => {
  const regexStr = '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$';
  const Regex = new RegExp(regexStr);
  return Regex.test(value); // should return Boolean
};
