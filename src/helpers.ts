import { entityPermission, entityStatus, invitationStatus, userRole, userStatus } from "./specs";

export function dateToString(value: string): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + "").padStart(2, "0");
  const day = (date.getDate() + "").padStart(2, "0");
  const hour = (date.getHours() + "").padStart(2, "0");
  const minutes = (date.getMinutes() + "").padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minutes}`;
}

export function userStatusToString(value: number): string {
  return userStatus[value];
}

export function userRoleToString(value: number): string {
  return userRole[value];
}

export function invitationStatusToString(value: number): string {
  return invitationStatus[value];
}

export function entityStatusToString(value: number): string {
  return entityStatus[value];
}

export function entityPermissionToString(value: number): string {
  return entityPermission[value];
}
