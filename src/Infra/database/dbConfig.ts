import mongoose,{ConnectOptions} from 'mongoose'

const ConnectionOptions:  ConnectOptions|any={
    useNewUrlParser:true,
    useUnifiedTopology:true
}




export const connectToDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION as string, ConnectionOptions);
      console.log('Connected to MongoDB');
      
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  export default connectToDatabase;
  