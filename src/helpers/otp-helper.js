const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const { EMAIL_ID, RESEND_API_KEY } = require('../config/server-config.js');
const resend = new Resend(RESEND_API_KEY);
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
       await resend.emails.send({
            from: `Your App <${EMAIL_ID}>`,
            to: email,
            subject: 'Email Verification - Your OTP',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>🔐 Email Verification</h2>
                    <p>Your OTP for email verification is:</p>
                    <h1 style="color:#2e86de;">${otp}</h1>
                    <p>This OTP is valid for <b>10 minutes</b>.</p>
                    <p>If you didn’t request this, please ignore this email.</p>
                </div>
            `,
        });

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
