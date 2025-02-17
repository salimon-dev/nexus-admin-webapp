export function dateToString(value: string): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + "").padStart(2, "0");
  const day = (date.getDate() + 1 + "").padStart(2, "0");
  const hour = (date.getHours() + "").padStart(2, "0");
  const minutes = (date.getMinutes() + "").padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minutes}`;
}

export function userStatusToString(value: number): string {
  const statuses = ["active", "inactive"];
  return statuses[value + 1];
}

export function userRoleToString(value: number): string {
  const roles = ["keymaker", "admin", "developer", "member"];
  return roles[value + 1];
}
