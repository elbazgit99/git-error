import mongoose from 'mongoose';
const CarPartSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, 'Part name is required'],
          trim: true,
          minlength: [2, 'Part name must be at least 2 characters long']
     },
     description: {
          type: String,
          trim: true,
          default: 'No description provided.'
     },
     imageUrl: {
          type: String,
          required: [true, 'Image is required']
     },
     imageFilename: {
          type: String,
          required: [true, 'Image filename is required']
     },
     price: {
          type: Number,
          required: [true, 'Price is required'],
          min: [0, 'Price cannot be negative']
     },
     brand: {
          type: String,
          trim: true,
          default: 'Generic'
     },
     category: {
          type: String,
          trim: true,
          required: [true, 'Category is required'],
          enum: [
               'Tires', 'Brakes', 'Filters', 'Electrics', 'Depreciations', 
               'Cooling System', 'Exhaust System', 'Sealing Rings', 'Accessories', 
               'Connections', 'Repair Set', 'Illuminated', 'Bearings', 
               'Air System', 'Gearbox', 'Planetary Joint'
          ]
     },
     compatibility: {
          type: String,
          trim: true,
          default: 'Universal'
     },
     // New field to mark parts as featured
     isFeatured: {
          type: Boolean,
          default: false
     },
     // References to the Producer and CarModel documents
     producer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Producer',
          required: [true, 'Producer ID is required for a car part']
     },
     model: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CarModel',
          required: [true, 'Car Model ID is required for a car part']
     },
},
{ timestamps: true });

// Add a compound unique index to ensure part names are unique per model (optional, but good for data integrity)
CarPartSchema.index({ name: 1, model: 1 }, { unique: true });


const CarPart = mongoose.model('CarPart', CarPartSchema);

export default CarPart;
