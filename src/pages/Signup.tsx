import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import parkingIcon from '@/assets/parking-icon.png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = () => {
    setShowOTP(true);
    // Add OTP logic here
  };

  const handleSignup = () => {
    // Add signup logic here
    console.log('Signup attempt', { ...formData, otp });
    
    // Navigate to vehicle details after successful signup
    navigate('/vehicle-details');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-bg-secondary">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
            <img src={parkingIcon} alt="Parkin Today" className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parkin Today</h1>
          <p className="body-small">Smart parking made simple</p>
        </div>

        {/* Signup Form */}
        <Card className="p-6">
          <CardHeader className="text-center pb-4">
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!showOTP ? (
              <>
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Send OTP Button */}
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full"
                  disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="body-small text-center">
                    OTP sent to {formData.email}
                  </p>
                </div>

                {/* Create Account Button */}
                <Button 
                  onClick={handleSignup} 
                  className="w-full"
                  disabled={otp.length !== 6}
                >
                  Create Account
                </Button>

                {/* Back Button */}
                <Button 
                  variant="glass" 
                  onClick={() => setShowOTP(false)}
                  className="w-full"
                >
                  Back
                </Button>
              </>
            )}

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="body-small">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-accent-hover font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;