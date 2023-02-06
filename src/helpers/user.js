export function getName(email) {
  const tempEmail = email.substring(0, email.indexOf("@"));
  return tempEmail.charAt(0).toUpperCase() + tempEmail.slice(1);
}

export function userHasRoles(roles) {
  return true;
}
