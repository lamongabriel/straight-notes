import { model, Schema } from 'mongoose'

interface INote {
  title: string
  body: string
  author: Schema.Types.ObjectId
}

const ModelSchema = new Schema<INote>({
  title: {
    type: Schema.Types.String,
    required: true
  },
  body: {
    type: Schema.Types.String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
{
  timestamps: true
})

ModelSchema.index({ title: 'text', body: 'text' })

export default model<INote>('Note', ModelSchema)
