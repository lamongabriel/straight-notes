import { model, Schema } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
}

const UserSchema = new Schema<IUser>({
  name: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  }
})

export default model<IUser>('User', UserSchema)
