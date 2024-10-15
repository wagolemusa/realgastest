import mongoose from 'mongoose'

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL || PORT,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`)
    })
}

export default dbConnect; 

// import mongoose from 'mongoose';

// const dbConnect = () => {
//     mongoose.connect(process.env.DB_URL || PORT)
//     .then((data) => {
//         console.log(`MongoDB connected with server: ${data.connection.host}`);
//     })
//     .catch((error) => {
//         console.error(`MongoDB connection error: ${error.message}`);
//     });
// };

// export default dbConnect;
