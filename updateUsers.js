const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path to your User model

// Replace 'yourdbname' with your actual MongoDB database name
mongoose.connect('mongodb+srv://hamzabedoui900:hamza@cluster0.sdk5r27.mongodb.net/CRM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addAvatarField = async () => {
  try {
    // Update documents without the avatar field
    await User.updateMany(
      { avatar: { $exists: false } },
      { $set: { avatar: null } }
    );
    console.log('Avatar field added to existing documents.');
  } catch (err) {
    console.error('Error updating documents:', err);
  } finally {
    mongoose.connection.close();
  }
};

addAvatarField();
