import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Billing = () => {
  const { lotId, slotId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const duration = parseInt(searchParams.get('duration') || '0');
  const totalCost = parseInt(searchParams.get('cost') || '30');
  const remainingCost = parseInt(searchParams.get('remaining') || '0');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handlePayment = () => {
    if (remainingCost <= 0) {
      // No additional payment needed
      setPaymentComplete(true);
      toast({
        title: "Session Complete!",
        description: "No additional payment required. Thank you!",
      });
      
      setTimeout(() => {
        navigate('/booking-history');
      }, 3000);
      return;
    }

    setIsProcessing(true);
    
    // Simulate auto-deduction
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      toast({
        title: "Payment Successful!",
        description: `₹${remainingCost} deducted automatically. Thank you for parking with us!`,
      });
      
      setTimeout(() => {
        navigate('/booking-history');
      }, 3000);
    }, 2000);
  };

  // Auto-start payment process
  useEffect(() => {
    const timer = setTimeout(handlePayment, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card text-center max-w-md w-full">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="title-large mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your parking session has been completed successfully.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Duration:</span>
                <span className="font-medium">{formatDuration(duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-medium">₹{totalCost}</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>Amount Paid:</span>
                <span className="font-medium">₹{totalCost}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Redirecting to main screen...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="title-large mb-2">Final Bill</h1>
        <p className="text-muted-foreground">Processing your parking session</p>
      </div>

      {/* Session Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Session Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4 p-3 glass-card rounded-lg">
            <MapPin className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-medium">Marina Bay Parking</h3>
              <p className="text-sm text-muted-foreground">
                Slot {slotId?.replace('slot-', 'A')}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parking Duration</span>
              <span className="font-medium">{formatDuration(duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>₹30/hour</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Initial Payment</span>
            <span>₹30</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Cost</span>
            <span>₹{totalCost}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>
                {remainingCost > 0 ? 'Remaining Balance' : 'Balance'}
              </span>
              <span className={remainingCost > 0 ? 'text-primary' : 'text-green-500'}>
                {remainingCost > 0 ? `₹${remainingCost}` : '₹0 (Paid)'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Payment Notice */}
      <Card className="mb-8">
        <CardContent className="p-4 text-center">
          {isProcessing ? (
            <div>
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-medium">Processing automatic payment...</p>
              <p className="text-sm text-muted-foreground mt-1">
                {remainingCost > 0 
                  ? `Deducting ₹${remainingCost} from your linked payment method`
                  : 'Finalizing your session'
                }
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="font-medium">Automatic Payment</p>
                <p className="text-sm text-muted-foreground">
                  Using your linked payment method
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;