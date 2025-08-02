import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Car, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ParkingSession = () => {
  const { lotId, slotId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sessionState, setSessionState] = useState<'booking' | 'entering' | 'parked' | 'exiting' | 'billing'>('booking');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAnpr, setShowAnpr] = useState(false);

  // Simulate the parking flow
  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionState('entering');
      setShowAnpr(true);
      
      // Simulate ANPR detection for entry
      setTimeout(() => {
        setShowAnpr(false);
        setSessionState('parked');
        setStartTime(new Date());
        
        toast({
          title: "Welcome!",
          description: "Your vehicle has entered the parking lot. Timer started.",
        });
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Timer effect
  useEffect(() => {
    if (sessionState === 'parked' && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sessionState, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateExit = () => {
    setSessionState('exiting');
    setShowAnpr(true);
    
    // Simulate ANPR detection for exit
    setTimeout(() => {
      setShowAnpr(false);
      setSessionState('billing');
      
      const totalCost = Math.max(30, Math.ceil(elapsedTime / 3600) * 30);
      const remainingCost = totalCost - 30;
      
      toast({
        title: "Exit Detected",
        description: "Processing your final bill...",
      });
      
      // Navigate to billing after calculation
      setTimeout(() => {
        navigate(`/billing/${lotId}/${slotId}?duration=${elapsedTime}&cost=${totalCost}&remaining=${remainingCost}`);
      }, 2000);
    }, 3000);
  };

  if (showAnpr) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card text-center max-w-md w-full">
          <CardContent className="p-8">
            <div className="relative mb-6">
              <div className="w-32 h-24 bg-gray-800 rounded-lg mx-auto flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse"></div>
            </div>
            
            <h2 className="title-large mb-2">
              {sessionState === 'entering' ? 'Verifying Entry' : 'Processing Exit'}
            </h2>
            <p className="text-muted-foreground">
              {sessionState === 'entering' 
                ? 'ANPR system detecting your license plate...' 
                : 'ANPR system confirming your exit...'
              }
            </p>
            
            <div className="mt-6">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionState === 'booking') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card text-center">
          <CardContent className="p-8">
            <div className="animate-pulse text-primary mb-4">
              <Car className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="title-large mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground">Please proceed to the parking lot...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="title-large mb-2">Parking Session Active</h1>
        <p className="text-muted-foreground">Your vehicle is parked safely</p>
      </div>

      {/* Timer Card */}
      <Card className="mb-6 text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            Parking Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary mb-2">
            {formatTime(elapsedTime)}
          </div>
          <p className="text-sm text-muted-foreground">
            Started at {startTime?.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      {/* Location Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-primary" />
            <div>
              <h3 className="title-medium">Marina Bay Parking</h3>
              <p className="text-sm text-muted-foreground">
                Slot {slotId?.replace('slot-', 'A')} • Level 1
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Cost */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Cost</span>
            <span className="text-xl font-bold text-primary">
              ₹{Math.max(30, Math.ceil(elapsedTime / 3600) * 30)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            ₹30 initial payment included
          </p>
        </CardContent>
      </Card>

      {/* Simulate Exit Button (for demo) */}
      <div className="text-center">
        <Button 
          onClick={simulateExit}
          variant="outline"
          className="mb-4"
        >
          Simulate Vehicle Exit (Demo)
        </Button>
        <p className="text-xs text-muted-foreground">
          In real app, ANPR will detect automatically
        </p>
      </div>
    </div>
  );
};

export default ParkingSession;