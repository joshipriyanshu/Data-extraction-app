const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: { type: String },
  taxRate: { type: String }, // e.g. "18%"
  quantity: { type: Number },
  ratePerItem: { type: Number },
  amount: { type: Number }
});

const taxSchema = new mongoose.Schema({
  taxableAmount: { type: Number },
  CGST: { type: Number },
  CGST_percentage: { type: Number },
  SGST: { type: Number },
  SGST_percentage: { type: Number },
  IGST: { type: Number },
  IGST_percentage: { type: Number }
});

const bankSchema = new mongoose.Schema({
  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  branch: { type: String },
  beneficiaryName: { type: String }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: String },
  placeOfSupply: { type: String },
  city: { type: String },

  customer: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },

  seller: {
    gstin: { type: String },
    companyName: { type: String },
    companyAddress: { type: String },
    mobile: { type: String },
    email: { type: String }
  },

  items: [itemSchema],
  tax: taxSchema,

  totals: {
    totalAmount: { type: Number },
    amountInWords: { type: String },
    balanceDue: { type: Number }
  },

  bankDetails: bankSchema,

  notes: { type: String },
  terms: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
