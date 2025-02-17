import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import emailjs from '@emailjs/browser';

interface OTPVerificationProps {
  email: string;
  userId: string;
  otp: string;
}

export default function OTPVerification({ email, userId, otp }: OTPVerificationProps) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOTP = verificationCode.join('');
    setIsVerifying(true);
    setError('');

    try {
      // Get latest user data to check OTP and expiry
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userData = userDoc.data();

      if (!userData) {
        setError('User data not found');
        return;
      }

      // Check if OTP has expired
      const otpExpiry = userData.otpExpiry?.toDate();
      if (otpExpiry && otpExpiry < new Date()) {
        setError('OTP has expired. Please request a new one.');
        return;
      }

      if (enteredOTP === userData.otp) {
        // Update user verification status in Firestore
        await updateDoc(doc(db, 'users', userId), {
          isVerified: true,
          otp: null,
          otpExpiry: null,
        });
        router.push('/dashboard');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Verification failed. Please try again.');
    }
    setIsVerifying(false);
  };

  const handleResendOTP = async () => {
    try {
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Update OTP in Firestore
      await updateDoc(doc(db, 'users', userId), {
        otp: newOTP,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      });

      // Send new OTP email
      await emailjs.send(
        'service_zue8h5s',
        'template_otp',
        {
          to_email: email,
          to_name: email.split('@')[0],
          otp: newOTP,
        },
        'uDHwReKU7E6T0l0S2'
      );

      setError('New OTP has been sent to your email.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            We sent a verification code to {email}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold text-white bg-gray-800 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={verificationCode.some(digit => !digit) || isVerifying}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendOTP}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
