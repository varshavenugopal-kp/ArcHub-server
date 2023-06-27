import mongoose,{ConnectOptions} from 'mongoose'

const ConnectionOptions:  ConnectOptions|any={
    useNewUrlParser:true,
    useUnifiedTopology:true
}




export const connectToDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/ArcHub', ConnectionOptions);
      console.log('Connected to MongoDB');
      
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  export default connectToDatabase;