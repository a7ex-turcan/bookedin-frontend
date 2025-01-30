export interface BookCollectionInfo {
  collectionName: string;
  workIds: string[];
}

export interface User {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  collections: BookCollectionInfo[];
}
