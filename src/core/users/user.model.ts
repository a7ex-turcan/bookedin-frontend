export interface BookCollectionInfo {
  collectionName: string;
  workIds: string[];
  id: string;
}

export interface User {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  nickName: string;
  profilePictureUrl?: string;
  collections: BookCollectionInfo[];
}
