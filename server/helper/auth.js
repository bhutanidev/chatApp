const bcrypt = require('bcrypt')


const hashpassword = async(password)=>{

    return new Promise((resolve , reject)=>{
        bcrypt.genSalt(12, function(err, salt) {
            if(err){reject(err)}
            bcrypt.hash(password, salt, function(err, hash) {

                if(err){
                    reject(err)
                }
                else{
                    resolve(hash)               
                }

            });
        });
    })
}

const comparePass = async(password,hashed)=>{
    return bcrypt.compare(password, hashed);
}

module.exports ={
    hashpassword,
    comparePass
}