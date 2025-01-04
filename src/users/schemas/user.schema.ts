import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) //Prop thuộc tính
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: string;

  @Prop()
  address: string;

  @Prop()
  createdAt: string;

  @Prop()
  updateAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
