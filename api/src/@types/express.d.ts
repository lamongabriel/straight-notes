declare namespace Express {
  export interface Request {
    user: {
      _id: ObjectId
      name: string
      email: string
    }
  }
}
