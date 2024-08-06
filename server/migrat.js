import { User } from "./src/models/users.js";
import mongoose from "mongoose";

async function migrateInvestedToBalance() {
    try {
      await mongoose.connect('mongodb://localhost:27017/your-database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const usersToUpdate = await User.find({ invested: { $exists: true } });
  
      for (const user of usersToUpdate) {
        user.balance = user.invested;
        await user.save();
      }
  
      console.log('Migration completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      mongoose.disconnect();
    }
  }
  
  migrateInvestedToBalance()
  .then(() => {
    console.log('Migration process completed successfully');
    process.exit(0); // Exit the script once migration is done
  })
  .catch((error) => {
    console.error('Migration process failed:', error);
    process.exit(1); // Exit with error code if migration fails
  });