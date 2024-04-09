import { IBaseEntity, BaseEntity } from './BaseEntity';

interface PostJson extends IBaseEntity {
  content?: string;
  userId: string;
}

class PostModel extends BaseEntity {
  constructor(json: PostJson) {
    super(json);
    this.userId = json.userId;
    this.content = json.content;
  }

  content?: string;
  userId: string;

  get canDelete(): boolean {
    return this.permissions.edit;
  }

  toJson(): Omit<PostJson, 'permissions' | 'createdDate' | 'lastModifiedDate'> {
    return {
      id: this.id,
      content: this.content,
      userId: this.userId
    };
  }
}
