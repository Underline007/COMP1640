import mongoose from 'mongoose'

interface IUser {
  name: string
  role: 'admin' | 'staff' | 'manager' | 'coordinator'
  username: string
  birthday: string
  phone: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    role: String,
    username: String,
    birthday: String,
    phone: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User