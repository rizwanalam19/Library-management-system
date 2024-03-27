import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
name:{
    type: String,
    required: true
},
classes:{
    type: Number,
    required: true
},
phone:{
    type: Number,
    required: true
},
books:[
    {
        book:{
            type: mongoose.Types.ObjectId,
            ref:"book"
        }

}
]


})

export const Student = mongoose.model("Student", studentSchema);


// name:{
//     type: String,
//     required: true
// },
// email:{
//     type: String,
//     required: true
// },
// phone_number:{
//     type: Number,
//     required: true
// },
// query:{
//     type: String,
// },
// data: {

//     fromCity:{
//         type: String,
//         required: true
//     },
//     pickupDate:{
//         type: String,
//         required: true
//     },
//     pickupTime:{
//         type: String,
//         required: true
//     },
//     packageName:{
//         type: String,
//     }
// }