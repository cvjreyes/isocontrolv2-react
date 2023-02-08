export function getName(email) {
  const tempEmail = email.substring(0, email.indexOf("@"));
  return tempEmail.charAt(0).toUpperCase() + tempEmail.slice(1);
}

export function userHasRoles(user, roles) {
  return roles.every((x) => user.roles.find((role) => role.name === x));
}
