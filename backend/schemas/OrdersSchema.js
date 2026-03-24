const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
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
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be positive"],
    },
    mode: {
      type: String,
      required: [true, "Order mode is required"],
      enum: {
        values: ["BUY", "SELL"],
        message: "Mode must be BUY or SELL",
      },
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "EXECUTED", "CANCELLED", "FAILED"],
      default: "EXECUTED",
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

OrdersSchema.index({ userId: 1, createdAt: -1 });
OrdersSchema.index({ userId: 1, status: 1 });

module.exports = { OrdersSchema };
