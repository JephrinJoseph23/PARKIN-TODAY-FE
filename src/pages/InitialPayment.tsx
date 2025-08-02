import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InitialPayment = () => {
  const { lotId, slotId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show booking confirmation
      toast({
        title: "Booking Confirmed!",
        description: "Your parking slot has been reserved.",
      });
      
      // Navigate to timer page after a brief delay
      setTimeout(() => {
        navigate(`/parking-session/${lotId}/${slotId}`);
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