const Reader = require('../Model/ReaderSchema');
  const secret = 'Reader'; // Replace this with your own secret key
const jwt=require('jsonwebtoken')
const multer=require('multer');
const WriterSchema = require('../Model/WriterSchema');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      const uniquePrefix = 'prefix-'; // Add your desired prefix here
      const originalname = file.originalname;
      const extension = originalname.split('.').pop();
      const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
      cb(null, filename);
    },
  });
  const upload = multer({ storage: storage }).single("profilePicture");
const registerReader = async (req, res) => {
    try {
         const { name,age,contact, email,password,userCategory } = req.body;

        const newReader = new Reader({
            name,
            age,
            contact,
            email,
            password,
            profilePicture:req.file,
            userCategory
                });

        
        let existingReader = await Reader.findOne({ contact });
        if (existingReader) {
            return res.json({
                status: 409,
                msg: "contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingReader1 = await WriterSchema.findOne({ email });
        let existingReader2 = await Reader.findOne({ email });
        if (existingReader1 ||existingReader2) {
            return res.json({
                status: 409,
                msg: "Mail Id Already Registered With Us !!",
                data: null
            });
        }
        await newReader.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                if (err.code === 11000) {
                    return res.json({
                        status: 409,
                        msg: "Email already in use",
                        data: err
                    });
                }
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View all Readers
const viewReaders = (req, res) => {
    Reader.find()
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Update Reader by ID
const editReaderById =async (req, res) => {
    let flag=0
    const { name,age,contact, email } = req.body;    let existingReader = await Reader.find({ contact });
    let ReaderData = await Reader.findById({  _id: req.params.id  });
await existingReader.map(x=>{
    if (x.contact!=ReaderData.contact) {
      flag=1        
    }
    
})
if(ReaderData.email!==req.body.email){
let existingReader1 = await WriterSchema.findOne({ email });
let existingReader2 = await Reader.findOne({ email });
if (existingReader1 ||existingReader2) {
    return res.json({
        status: 409,
        msg: "Mail Id Already Registered With Us !!",
        data: null
    });
}
}
if(flag==0){
   
   await Reader.findByIdAndUpdate({ _id: req.params.id }, {
    name,
    age,
    contact,
    email,
    password,
    profilePicture:req.file,
    userCategory
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
    }
    else{
        return res.json({
            status: 409,
            msg: "contact Number Already Registered With Us !!",
            data: null
        });
    }
};

// View Reader by ID
const viewReaderById = (req, res) => {
    Reader.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Delete Reader by ID
const deleteReaderById = (req, res) => {
    Reader.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Forgot Password for Reader
const upgradeToWriter = async(req, res) => {
  const datas= await Reader.findById({ _id: req.params.id })
  console.log(datas)

  if(datas!=null){
    let flag=0
  const { name,age,contact, email,password,userCategory } = datas;
console.log(datas)

  const newWriter = new WriterSchema({
    name:datas.name,
    age:datas.age,
    contact:datas.contact,
    email:datas.email,
    password:datas.password,
    profilePicture:datas.profilePicture,
    userCategory:datas.userCategory
        });



await newWriter.save()
    .then(data => {
        flag=1
        return res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data
        });
    })
    .catch(err => {
    
        return res.json({
            status: 500,
            msg: "Data not Inserted",
            data: err
        });
    });
    if(flag==1)
await Reader.findByIdAndDelete(req.params.id)

  }
  else{
    return res.json({
        status: 500,
        msg: "Data not Inserted"
        
    });
  }
  }
    
  //Payment
  



// Reset Password for Reader
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Reader.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await Reader.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  };
  
  const login =async (req, res) => {
    const { email, password } = req.body;

    let reader=null,writer=null
    try{
         reader = await Reader.findOne({ email:  req.body.email })
      

  
   if(reader!=null){
    if (reader.password!=password) {
        return res.json({ status:405,msg: 'Password Mismatch !!' });
      }

    
      const token = createToken(reader);

      res.json({
          status:200,
          data:reader, 
          token });
   }
   else {
    writer = await WriterSchema.findOne({ email:  req.body.email })
      

  
    if(writer!=null){
     if (writer.password!=password) {
         return res.json({ status:405,msg: 'Password Mismatch !!' });
       }
 
     
       const token = createToken(writer);
 
       res.json({
           status:200,
           data:writer, 
           token });

   }
     
  else{
    return res.json({ status:405,msg: 'User Not Found !!' });
  }
    
  
        
}
    }
   catch(err){
     console.log(err);
            return res.json({status:500,msg: 'Something went wrong' });
          
   }
  };
     
  //validate
  
  const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    console.log("t1",token);
    console.log("secret",secret);
    if (!token) {
      return res.json({status:401,msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.json({status:401, messagge: 'Unauthorized' ,err:err});
      }
  
      req.user = decodedToken.userId;
      next();
      return res.json({ status:200,msg: 'ok' ,user:decodedToken.userId});
    });
    console.log(req.user);
  };
  
  //Login Custome --finished

module.exports = {
    registerReader,
    viewReaders,
    editReaderById,
    viewReaderById,
    deleteReaderById,
    upgradeToWriter,
    resetPassword,
    login,
    requireAuth,
    upload
};
