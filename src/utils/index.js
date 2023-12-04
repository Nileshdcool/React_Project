import { fileNameOrigin } from "./jobDetailsFunctions";

export const base64ToBlob = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/pdf' });
};

export const getFileDataForInitialDoc = (file, isFullPathUse) => {
    if (!!isFullPathUse) {
      return file && file.id ? `${file.url ||
        file.fileUrl || file.drawing.fileUrl}` :
        null;
    }
    else {
      return file.id ? file.url ||
        file.fileUrl || file.drawing.fileUrl : null;
    }
}

export const isRecentFileExist = (addedFile, drawings) => {
  const addedFileName = addedFile && addedFile.fileName && fileNameOrigin(addedFile.fileName) || null;
  const sameFile = addedFileName && drawings && drawings.find((fileItem) => fileNameOrigin(fileItem.fileName) === addedFileName);
  return Boolean(sameFile);
};

export const filteredNotificationsForStation = (notifications, jobId) =>
  notifications.filter(item => item.lineJobId === jobId);

export const getUserRoleKeyByRolesData = (userRole) => {
  if (!userRole || userRole === '') {
    return 'none';
  }
  switch (true) {
    case userRole.planner:
      return 'planner';
    case userRole.supervisor:
      return 'supervisor';
    case userRole.leadman:
      return 'leadman';
    case userRole.operator:
      return 'operator';
    default:
      return 'none';
  }
}

export const checkUserRolesIsRequired = (userRole, requiredRoles) => {
  return requiredRoles.filter(item => userRole[item]).length
}
