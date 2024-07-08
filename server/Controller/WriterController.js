const Writer = require('../Model/WriterSchema');
  const secret = 'Writer'; // Replace this with your own secret key
const jwt=require('jsonwebtoken')
const multer=require('multer');
const ReaderSchema = require('../Model/ReaderSchema');
const nodemailer = require('nodemailer');
const config=require('./configuration')

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supprot.web.application@gmail.com',
      pass: 'ukyw olqq kuql jnty'
    }
  });
  
  
  const testMail = (data) => {
    let email=data.email
    const mailOptions = {
      from: 'supprot.web.application@gmail.com',
      to: email,
      subject: 'Reset Password From Story_Telling Application',
      text: `Dear ${data.name},${'\n'}please check this link : ${config.serverUrl}${data._id} to reset your password`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
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
const registerWriter = async (req, res) => {
    try {
         const { name,age,contact, email,password,userCategory } = req.body;

        const newWriter = new Writer({
            name,
            age,
            contact,
            email,
            password,
            profilePicture:req.file,
            userCategory
                });

        
        let existingWriter = await Writer.findOne({ contact });
        if (existingWriter) {
            return res.json({
                status: 409,
                msg: "contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingWriter1 = await Writer.findOne({ email });
        let existingWriter2 = await ReaderSchema.findOne({ email });
        if (existingWriter1 ||existingWriter2) {
            return res.json({
                status: 409,
                msg: "Mail Id Already Registered With Us !!",
                data: null
            });
        }
        await newWriter.save()
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


// View all Writers
const viewWriters = (req, res) => {
    Writer.find({adminApproved:true})
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

// View all Writers
const viewWriterReqsforAdmin = (req, res) => {
    Writer.find({adminApproved:false})
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

// Update Writer by ID
const editWriterById = async (req, res) => {
    try {
      const { name, age, contact, email, userCategory, paymentStatus, amount, isActive, adminApproved } = req.body;
  
      // Find the writer by ID
      const writerData = await Writer.findById(req.params.id);
      if (!writerData) {
        return res.status(404).json({
          status: 404,
          msg: "Writer not found",
          data: null,
        });
      }
  
      // Check if contact number has changed and if the new contact number is already registered
      if (writerData.contact !== contact) {
        const existingWriterByContact = await Writer.findOne({ contact });
        if (existingWriterByContact) {
          return res.status(409).json({
            status: 409,
            msg: "Contact number already registered with us!",
            data: null,
          });
        }
      }
  
      // Check if email has changed and if the new email is already registered
      if (writerData.email !== email) {
        const existingWriterByEmail = await Writer.findOne({ email });
        const existingReaderByEmail = await ReaderSchema.findOne({ email });
        if (existingWriterByEmail || existingReaderByEmail) {
          return res.status(409).json({
            status: 409,
            msg: "Email already registered with us!",
            data: null,
          });
        }
      }
  
      // Update writer data
      const updateData = {
        name,
        age,
        contact,
        email,
        userCategory,
        paymentStatus,
        amount,
        isActive,
        adminApproved,
      };
  
      if (req.file) {
        updateData.profilePicture = req.file.filename; // Save the new filename
      }
  
      const updatedWriter = await Writer.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      return res.status(200).json({
        status: 200,
        msg: "Updated successfully",
        data: updatedWriter,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        msg: "Data not updated",
        error: error.message,
      });
    }
  };
    
// View Writer by ID
const viewWriterById = (req, res) => {
    Writer.findById({ _id: req.params.id })
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

// accept
const acceptWriterById =async (req, res) => {
  let flag=0
   await Writer.findByIdAndUpdate({ _id: req.params.id },{adminApproved:true,isActive:true})
        .exec()
        .then(data => {
          if(data)
            flag=1
            res.json({
                status: 200,
                msg: "Accepted successfully",
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

        if (flag == 1) await Reader.findByIdAndDelete(req.params.id);
};


// accept
const activateWriterById = (req, res) => {
    Writer.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Rejected successfully",
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

// accept
const deActivateWriterById = (req, res) => {
    Writer.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
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
// reject

const rejectWriterById = (req, res) => {
    Writer.findByIdAndDelete({ _id: req.params.id })
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

// Forgot Password for Writer
const forgotPWDsentMail=async(req,res)=>{
    let data=null
    try{
         data = await Writer.findOne({ email:  req.body.email })
        if(data==null){
         data = await ReaderSchema.findOne({ email:  req.body.email })
        }
        
          if (data != null)
            {
              let id=data._id.toString()
              testMail(data)
            res.json({
              status: 200,
              msg: "Data Obtained successfully",
            });
          }
          else
            res.json({
              status: 500,
              msg: "Enter your Registered MailId",
            });
        }
        catch(err) {
          console.log(err);
          res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err,
          })
        }
    
      }

// Reset Password for Writer
const resetPassword = async (req, res) => {
    console.log(req.body);
if(req.body.userrole=='reader')
    {
        await ReaderSchema.findByIdAndUpdate({ _id: req.params.id }, {
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
                res.json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    }
    else if(req.body.userrole=='writer'){
        await Writer.findByIdAndUpdate({ _id: req.params.id }, {
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
                res.json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 409,
            msg: "Link Expired! Try Again",
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  };
  
  const login = (req, res) => {
    const { email, password } = req.body;
  
    Writer.findOne({ email }).then(user => {
     
  
      if (!user) {
        return res.json({status:405,msg: 'User not found' });
      }
  
        if (user.password!=password) {
          return res.json({ status:405,msg: 'Password Mismatch !!' });
        }
  
      
        const token = createToken(user);
  
        res.json({
            status:200,
            data:user, 
            token });
     
    }).catch(err=>{
     console.log(err);
            return res.json({status:500,msg: 'Something went wrong' });
          
    })
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

  // Delete Reader by ID
const addPayment = (req, res) => {
    console.log(req.body);
    Writer.findByIdAndUpdate({ _id: req.params.id },{paymentStatus:true,amount:req.body.amount})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Payment Done successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "payment failed",
                Error: err
            });
        });
};
module.exports = {
    registerWriter,
    viewWriters,
    editWriterById,
    viewWriterById,
    rejectWriterById,
    forgotPWDsentMail,
    resetPassword,
    login,
    requireAuth,
    upload,
    addPayment,
    viewWriterReqsforAdmin,
activateWriterById,
deActivateWriterById,
acceptWriterById
    
};
