import UniqueEntityID from '../../../@seedwork/domain/unique-entity-id.vo';

export type CategoryProperties = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
}

export class Category {
  public readonly id: UniqueEntityID;
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID();
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }
  
  get description() {
    return this.props.description;
  }
  
  private set description(value: string) {
    this.props.description = value ?? null;
  }
  
  get is_active() {
    return this.props.is_active;
  }
  
  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }
  
  get created_at() {
    return this.props.created_at;
  }
}