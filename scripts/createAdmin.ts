
import adminModel from '../src/models/adminSchema.model';
import { hashPassword } from '../src/guards/guards';
import { connectDb } from "../src/config/Db"
import config from '../src/config/config';



const createDefaultAdmin = async () => {

    await connectDb()

  try {
    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({ email: 'admin@schoolportal.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return process.exit()
    }

    // Create default admin
    const adminData = {
      firstname: 'School',
      surname: 'Admin',
      username: 'super_admin',
      email: 'admin@schoolportal.com',
      password: hashPassword(config.admin_password), // default password
      isVerified: true,
      role: 'admin' 
    };

    const admin = new adminModel(adminData);
    await admin.save();
    
    console.log('Default admin created successfully');
    console.log('Email: admin@schoolportal.com');
    console.log('Password: admin123');

    process.exit(1)
    
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

// createDefaultAdmin();