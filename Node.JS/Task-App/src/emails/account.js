const sgMail=require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'catchyogesh7@gmail.com',
        subject:'Welcome Task App',
        text:`Welcome to the Task App,${name}!`
    })
};

const sendFeedbackMail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'catchyogesh7@gmail.com',
        subject:'Thank you for using Task App',
        text:`Thank you for using the Task App,${name}! We would like to know a reason why you are deleting an account`
    })
};

module.exports={
    sendWelcomeMail,
    sendFeedbackMail
};