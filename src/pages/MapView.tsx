import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Clock, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import parkingHero from '@/assets/parking-hero.jpg';

interface ParkingLot {
  id: string;
  name: string;
  distance: string;
  availableSlots: number;
  totalSlots: number;
  pricePerHour: number;
  coordinates: [number, number];
}

const MapView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock parking lots data
  const parkingLots: ParkingLot[] = [
    {
      id: '1',
      name: 'Marina Bay Parking',
      distance: '200m',
      availableSlots: 15,
      totalSlots: 50,
      pricePerHour: 30,
      coordinates: [1.2916, 103.8616]
    },
    {
      id: '2',
      name: 'City Center Mall',
      distance: '450m',
      availableSlots: 8,
      totalSlots: 75,
      pricePerHour: 25,
      coordinates: [1.2955, 103.8584]
    },
    {
      id: '3',
      name: 'Business District',
      distance: '680m',
      availableSlots: 22,
      totalSlots: 100,
      pricePerHour: 35,
      coordinates: [1.2823, 103.8579]
    },
    {
      id: '4',
      name: 'Shopping Plaza',
      distance: '1.2km',
      availableSlots: 5,
      totalSlots: 60,
      pricePerHour: 20,
      coordinates: [1.3015, 103.8541]
    }
  ];

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-primary';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={parkingHero} 
          alt="Smart Parking" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        {/* Search Bar */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card border-border-muted/30"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="body-small">Parking Lots</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">3km</div>
            <div className="body-small">Search Radius</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">₹25</div>
            <div className="body-small">Avg. Price/hr</div>
          </Card>
        </div>

        {/* Parking Lots List */}
        <div className="space-y-4">
          <h2 className="title-large">Available Parking</h2>
          
          {parkingLots.map((lot) => (
            <Card key={lot.id} className="hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="title-medium">{lot.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{lot.distance} away</span>
                      <span className={getAvailabilityColor(lot.availableSlots, lot.totalSlots)}>
                        {lot.availableSlots}/{lot.totalSlots} slots
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">₹{lot.pricePerHour}/hour</span>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <Link to={`/slot-selection/${lot.id}`}>
                      <Button size="sm" className="accent-glow">
                        Park Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-6 left-4 right-4">
          <Button 
            onClick={() => navigate('/map')}
            className="w-full btn-primary" 
            size="lg"
          >
            <Car className="w-5 h-5 mr-2" />
            Find Best Spot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;