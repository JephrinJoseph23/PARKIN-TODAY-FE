import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Clock, Calendar, IndianRupee } from 'lucide-react';

interface BookingRecord {
  id: string;
  lotName: string;
  slotNumber: string;
  date: string;
  duration: string;
  totalCost: number;
  status: 'completed' | 'cancelled';
}

const BookingHistory = () => {
  const navigate = useNavigate();
  
  // Mock booking history data
  const bookingHistory: BookingRecord[] = [
    {
      id: '1',
      lotName: 'Marina Bay Parking',
      slotNumber: 'A1',
      date: '2024-01-15',
      duration: '2h 15m',
      totalCost: 67,
      status: 'completed'
    },
    {
      id: '2',
      lotName: 'City Center Mall',
      slotNumber: 'B3',
      date: '2024-01-10',
      duration: '1h 30m',
      totalCost: 37,
      status: 'completed'
    },
    {
      id: '3',
      lotName: 'Business District',
      slotNumber: 'C5',
      date: '2024-01-08',
      duration: '0h 45m',
      totalCost: 26,
      status: 'cancelled'
    },
    {
      id: '4',
      lotName: 'Shopping Plaza',
      slotNumber: 'A7',
      date: '2024-01-05',
      duration: '3h 20m',
      totalCost: 66,
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBg = (status: string) => {
    return status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Booking History</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {bookingHistory.filter(b => b.status === 'completed').length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary mb-1">
            ₹{bookingHistory.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalCost, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </Card>
      </div>

      {/* Booking History List */}
      <div className="space-y-4">
        {bookingHistory.map((booking) => (
          <Card key={booking.id} className="hover:scale-[1.01] transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{booking.lotName}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(booking.status)} ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Slot {booking.slotNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Duration: {booking.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">₹{booking.totalCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookingHistory.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Booking History</h3>
          <p className="text-muted-foreground">Your parking history will appear here</p>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;