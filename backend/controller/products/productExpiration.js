const moment = require('moment'); // install momentjs

// Define your product schema
const productSchema = new mongoose.Schema({
  // Other fields for your product
  expirationDate: Date,
});
// Define your archive schema
const archiveSchema = new mongoose.Schema({
//   fields for your product schema
});

const Product = mongoose.model('Product', productSchema);

// Function to move expired products to the archive collection
async function moveExpiredProductsToArchive() {
  try {
    // Get the current server time
    const serverTime = new Date();

    // Calculate the date 30 days ago
    const thirtyDaysAgo = moment(serverTime).subtract(30, 'days').toDate();

    // Find products that have expired
    const expiredProducts = await Product.find({
      expirationDate: { $lte: thirtyDaysAgo },
    });

    if (expiredProducts.length > 0) {
      // Move expired products to the archive collection
      await Archive.insertMany(expiredProducts);

      // Remove expired products from the products collection
      await Product.deleteMany({ _id: { $in: expiredProducts.map(p => p._id) } });
    }

    console.log(`${expiredProducts.length} products moved to archive.`);
  } catch (err) {
    console.error('Error moving expired products:', err);
  }
}

// Run the script every day at a specific time (e.g., 2:00 AM)
setInterval(() => {
  moveExpiredProductsToArchive();
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

