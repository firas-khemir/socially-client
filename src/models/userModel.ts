import { BaseEntity, IBaseEntity } from './BaseEntity';

interface IUser extends IBaseEntity {
  email?: string;
  displayName?: string;
  profilePic?: string;
  key?: string;
  contact?: string;
  bio?: string;
  birthdate?: string;
  location?: string;
  createdAt?: string;
  userName?: string;
  followersCount?: number;
  followingCount?: number;
  webSite?: string;
  isVerified?: boolean;
  fcmToken?: string;
  followersInCommon?: string[];
}

class UserModel extends BaseEntity {
  constructor(json: IUser) {
    super(json);
    this.email = json.email;
    this.displayName = json.displayName;
    this.profilePic = json.profilePic;
    this.key = json.key;
    this.contact = json.contact;
    this.bio = json.bio;
    this.birthdate = json.birthdate;
    this.location = json.location;
    this.createdAt = json.createdAt;
    this.userName = json.userName;
    this.followersCount = json.followersCount;
    this.followingCount = json.followingCount;
    this.webSite = json.webSite;
    this.isVerified = json.isVerified;
    this.fcmToken = json.fcmToken;
    this.followersInCommon = json.followersInCommon || [];
  }

  key?: string;
  email?: string;
  displayName?: string;
  userName?: string;
  webSite?: string;
  profilePic?: string;
  contact?: string;
  bio?: string;
  location?: string;
  birthdate?: string;
  createdAt?: string;
  isVerified?: boolean;
  followersCount?: number;
  followingCount?: number;
  fcmToken?: string;
  followersInCommon?: string[];

  get canDelete(): boolean {
    return this.permissions.edit;
  }

  toJson(): Omit<IUser, 'permissions' | 'createdDate' | 'lastModifiedDate'> {
    return {
      key: this.key,
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      profilePic: this.profilePic,
      contact: this.contact,
      birthdate: this.birthdate,
      bio: this.bio,
      location: this.location,
      createdAt: this.createdAt,
      followersCount: this.followersCount,
      followingCount: this.followingCount,
      userName: this.userName,
      webSite: this.webSite,
      isVerified: this.isVerified || false,
      fcmToken: this.fcmToken,
      followersInCommon: this.followersInCommon
    };
  }
}
