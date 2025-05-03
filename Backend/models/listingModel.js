// const mongoose = require('mongoose');
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['rent', 'sale'],
    required: true,
  },
  offer: {
    type: Boolean,
    default: false,
  },
  imageURLs: {
    type: [Object],
    validate: [arrayLimit, 'Maximum 6 images allowed'],
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });


function arrayLimit(val) {
  return val.length <= 6;
}

const ListingModel = mongoose.model('Listing', listingSchema);
export default ListingModel;