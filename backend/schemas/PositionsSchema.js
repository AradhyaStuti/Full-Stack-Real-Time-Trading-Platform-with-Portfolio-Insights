const { Schema } = require("mongoose");

const PositionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
      index: true,
    },
    product: {
      type: String,
      required: [true, "Product type is required"],
      enum: {
        values: ["CNC", "MIS", "NRML"],
        message: "Product must be CNC, MIS, or NRML",
      },
      default: "CNC",
    },
    name: {
      type: String,
      required: [true, "Stock name is required"],
      trim: true,
      uppercase: true,
    },
    qty: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    avg: {
      type: Number,
      required: [true, "Average price is required"],
      min: [0, "Average price cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Current price is required"],
      min: [0, "Price cannot be negative"],
    },
    net: {
      type: Number,
      default: 0,
    },
    day: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

PositionsSchema.virtual("currentValue").get(function () {
  return this.price * this.qty;
});

PositionsSchema.virtual("pnl").get(function () {
  return (this.price - this.avg) * this.qty;
});

PositionsSchema.virtual("isLoss").get(function () {
  return this.pnl < 0;
});

PositionsSchema.index({ userId: 1, name: 1 });

module.exports = { PositionsSchema };
