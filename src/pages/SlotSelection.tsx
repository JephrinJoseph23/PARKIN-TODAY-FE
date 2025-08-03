import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Car } from 'lucide-react';

const SlotSelection = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Fixed slot data - 15 total slots, 5 green (available), 10 red (occupied)
  const slots = Array.from({ length: 15 }, (_, i) => ({
    id: `slot-${i + 1}`,
    number: `A${i + 1}`,
    isAvailable: i < 5, // First 5 slots are available (green), rest are occupied (red)
    isEntry: i === 0,
    isExit: i === 14
  }));

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleProceed = () => {
    if (selectedSlot) {
      navigate(`/initial-payment/${lotId}/${selectedSlot}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="title-large">Select Parking Slot</h1>
      </div>

      {/* Lot Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Marina Bay Parking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">200m away</span>
            <span className="text-primary">₹30/hour</span>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>

      {/* Slots Grid - Two columns with varying sizes */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            onClick={() => slot.isAvailable && handleSlotSelect(slot.id)}
            className={`
              rounded-lg border-2 flex flex-col items-center justify-center
              transition-all duration-200 relative
              ${index < 3 ? 'h-24' : index < 8 ? 'h-20' : 'h-16'} // Large to small sizes
              ${slot.isAvailable 
                ? selectedSlot === slot.id 
                  ? 'bg-blue-500 border-blue-600 text-white cursor-pointer' 
                  : 'bg-green-500 border-green-600 text-white hover:bg-green-600 cursor-pointer'
                : 'bg-red-500 border-red-600 text-white cursor-not-allowed'
              }
            `}
          >
            <Car className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{slot.number}</span>
            
            {slot.isEntry && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 
                            bg-primary text-background text-xs px-2 py-1 rounded-full">
                Entry
              </div>
            )}
            
            {slot.isExit && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                            bg-accent text-background text-xs px-2 py-1 rounded-full">
                Exit
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proceed Button */}
      {selectedSlot && (
        <div className="fixed bottom-6 left-4 right-4">
          <Button 
            onClick={handleProceed}
            className="w-full btn-primary" 
            size="lg"
          >
            Proceed to Initial Payment
          </Button>
        </div>
      )}
    </div>
  );
};

export default SlotSelection;