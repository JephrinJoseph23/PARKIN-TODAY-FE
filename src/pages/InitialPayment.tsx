import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Wallet, Timer, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InitialPayment = () => {
  const { lotId, slotId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEntryTimer, setShowEntryTimer] = useState(false);
  const [entryTimeLeft, setEntryTimeLeft] = useState(3600); // 1 hour in seconds
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Entry timer effect
  useEffect(() => {
    if (!showEntryTimer || !paymentCompleted) return;

    const timer = setInterval(() => {
      setEntryTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired - booking cancelled
          clearInterval(timer);
          toast({
            title: "Booking Cancelled",
            description: "You didn't enter within one hour. Money won't be refunded.",
            variant: "destructive"
          });
          setTimeout(() => navigate('/'), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showEntryTimer, paymentCompleted, navigate, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateVehicleEntry = () => {
    toast({
      title: "Verifying Entry",
      description: "ANPR system detected your vehicle.",
    });
    
    setTimeout(() => {
      navigate(`/parking-session/${lotId}/${slotId}`);
    }, 2000);
  };

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      
      // Show booking confirmation
      toast({
        title: "Booking Confirmed!",
        description: "Your parking slot has been reserved. You have 1 hour to enter.",
      });
      
      // Start entry timer
      setTimeout(() => {
        setShowEntryTimer(true);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="title-large">Initial Payment</h1>
      </div>

      {/* Booking Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Parking Lot</span>
            <span>Marina Bay Parking</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Slot</span>
            <span>{slotId?.replace('slot-', 'A')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span>₹30/hour</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Initial Payment</span>
              <span className="text-primary">₹30</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Additional charges will be calculated based on actual parking duration
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-4 mb-8">
        <h2 className="title-medium">Choose Payment Method</h2>
        
        <Button
          onClick={() => handlePayment('gpay')}
          disabled={isProcessing}
          className="w-full h-16 glass-card hover:scale-[1.02] transition-transform"
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Google Pay</div>
              <div className="text-sm text-muted-foreground">Pay with GPay</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => handlePayment('paytm')}
          disabled={isProcessing}
          className="w-full h-16 glass-card hover:scale-[1.02] transition-transform"
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Paytm</div>
              <div className="text-sm text-muted-foreground">Pay with Paytm Wallet</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => handlePayment('card')}
          disabled={isProcessing}
          className="w-full h-16 glass-card hover:scale-[1.02] transition-transform"
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Credit/Debit Card</div>
              <div className="text-sm text-muted-foreground">Pay with card</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Entry Timer */}
      {showEntryTimer && (
        <Card className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Timer className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-600">Entry Timer</h3>
            </div>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-orange-600">
                {formatTime(entryTimeLeft)}
              </div>
              <p className="text-sm text-muted-foreground">
                Time remaining to enter the parking lot
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
                <AlertCircle className="w-4 h-4" />
                <span>Enter within 1 hour or booking will be cancelled</span>
              </div>
            </div>
            <Button 
              onClick={simulateVehicleEntry}
              className="w-full mt-4"
              size="lg"
            >
              Simulate Vehicle Entry
            </Button>
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <Card className="glass-card p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing Payment...</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InitialPayment;