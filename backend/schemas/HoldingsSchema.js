const { Schema } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
      index: true,
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
      required: [true, "Average cost is required"],
      min: [0, "Average cost cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
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

HoldingsSchema.virtual("currentValue").get(function () {
  return this.price * this.qty;
});

HoldingsSchema.virtual("pnl").get(function () {
  return (this.price - this.avg) * this.qty;
});

HoldingsSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = { HoldingsSchema };
