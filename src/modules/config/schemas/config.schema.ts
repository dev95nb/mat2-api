import { Schema } from 'mongoose';

const ConfigAppSchema = {
  name: 'Config',
  schema: new Schema(
    {
      b2: {
        token: String,
        updatedAt: Date,
      },
    },
    {
      timestamps: true,
    },
  ),
};

export { ConfigAppSchema };
