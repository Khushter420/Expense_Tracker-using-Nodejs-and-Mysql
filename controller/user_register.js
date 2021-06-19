const user_detail = require('../models/user');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

exports.Postuser = (req, res, next) => {
   // console.log(req.body.email);
   bcryptjs.genSalt(10,(err,salt)=>{
     bcryptjs.hash(req.body.Password,salt,(err,hash)=>{
      // console.log(hash);
      const name = req.body.name;
      const email = req.body.emailId;
      const password = hash;
     user_detail.create({
      name:name,
      email:email,
      password:password
    })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
   })
   });
  };
  
  function generateToken(id) {
    return jwt.sign(id ,process.env.JWT_KEY);
}

  exports.Login = (req,res,next)=>{
   // console.log(req.body);
    const email=req.body.emailId
    const password=req.body.Password;
    user_detail.findAll({ where:{email}}).then(result=>{
      //console.log(result);
      if(result.length>0){
        bcryptjs.compare(password, result[0].password, function(err, response) {
          if (err){
          console.log(err)
          return res.json({success: false, message: 'Something went wrong'})
          }
          if (response){
              console.log(JSON.stringify(result))
              const jwttoken = generateToken(result[0].id);
             // console.log(jwttoken)
              res.json({token: jwttoken, success: true, message: 'Successfully Logged In'})
          // Send JWT
          } else {
          // response is OutgoingMessage object that server response http request
          return res.status(401).json({success: false, message: 'something wrong'});
          }
      });
  } else {
      return res.status(404).json({success: false, message: 'somthing wrong'})
  }
})
}
