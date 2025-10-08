const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { EMAIL_ID, EMAIL_PASSWORD } = require('../config/server-config.js');

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

const hashOTP = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const verifyHashedOTP = (otp, hashedOtp) => {
    if (!otp || !hashedOtp) {
        return false;
    }

    const hashedInputOTP = hashOTP(otp);
    // console.log('verifyHashedOTP comparison:', {
    //     inputOtp: otp,
    //     hashedInputOTP,
    //     storedHashedOtp: hashedOtp,
    //     match: hashedInputOTP === hashedOtp
    // });

    return hashedInputOTP === hashedOtp;
};

const verifyHashedPassword = (password, hashedPassword) => {
    const hashedInputPassword = hashOTP(password);
    return hashedInputPassword === hashedPassword;
};

const sendOTPByEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_ID,
                pass: EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: EMAIL_ID,
            to: email,
            subject: 'Email Verification - Your OTP',
            text: `Your OTP for email verification is: ${otp}. Please use this OTP within 10 minutes.`,
        };
        await transporter.sendMail(mailOptions);

        // console.log(`OTP sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = {
    generateOTP,
    hashOTP,
    hashPassword,
    verifyHashedOTP,
    verifyHashedPassword,
    sendOTPByEmail
}
