const  nodemailer = require("nodemailer")

const sendMail = ({name,surname,email}) =>{
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth:{
            user: process.env.REACT_APP_EMAIL,
            pass: process.env.REACT_APP_EMAIL_PASS,
        },
    });

    let mailOptions = {
        from:process.env.REACT_APP_EMAIL,
        to:email,
        subject:"Account Verification Link",
        text:`Dear ${name} ${surname}, your offer has been accepted, we will contact you soon. Thank you for applying and trusting us․Best regards, Omut team!!!`
    };

    transporter.sendMail(mailOptions,function (err,success) {
        if(err){
            console.log(err)
        }else{
            return res.status(200).send({message:'A verification email has been sent to ' + user.email});
        }
    })
}

module.exports = {sendMail}