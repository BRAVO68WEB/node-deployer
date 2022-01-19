import mongoose, { Schema } from 'mongoose'

const postJobSchema = new Schema(
  {
    gitUrl: {
      type: String,
    },
    deployLocation: {
      type: String,
    },
    deploySys: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    gitBranch: {
      type: String,
      default: "master",
    },
    buildRequired: {
      type: Boolean,
      default: false,
    },
    removeNodeModules: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

postJobSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      gitUrl: this.gitUrl,
      deployLocation: this.deployLocation,
      deploySys: this.deploySys,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('PostJob', postJobSchema)

export const schema = model.schema
export default model
