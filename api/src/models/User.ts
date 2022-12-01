import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10)
      this.password = hashedPassword
      next()
    } catch (error) {
      next(error as Error)
    }
  }
})

export default model<IUser>('User', UserSchema)
