import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import parkingIcon from '@/assets/parking-icon.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    setShowOTP(true);
    // Add OTP logic here
  };

  const handleLogin = () => {
    // Add login logic here
    console.log('Login attempt', { email, password, otp });
    
    // Navigate to map view after successful login
    navigate('/map');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-bg-secondary">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
            <img src={parkingIcon} alt="ParkSmart" className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">ParkSmart</h1>
          <p className="body-small">Smart parking made simple</p>
        </div>

        {/* Login Form */}
        <Card className="p-6">
          <CardHeader className="text-center pb-4">
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!showOTP ? (
              <>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="body-small font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Send OTP Button */}
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full"
                  disabled={!email || !password}
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
                    OTP sent to {email}
                  </p>
                </div>

                {/* Login Button */}
                <Button 
                  onClick={handleLogin} 
                  className="w-full"
                  disabled={otp.length !== 6}
                >
                  Login
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

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="body-small">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-accent-hover font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;