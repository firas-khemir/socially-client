import moment from 'moment';

export interface IBaseEntity {
  id: string;
  permissions: {
    view: boolean;
    edit: boolean;
    owner: boolean;
  };
  createdDate?: Date;
  lastModifiedDate?: Date;
}

export class BaseEntity {
  constructor(json: IBaseEntity) {
    this.id = json.id;
    this.permissions = json.permissions;
    this.createdDate = moment(json.createdDate).toDate();
    this.lastModifiedDate = moment(json.lastModifiedDate).toDate();
  }

  id: string;
  permissions: {
    view: boolean;
    edit: boolean;
    owner: boolean;
  };
  createdDate?: Date;
  lastModifiedDate?: Date;
}
