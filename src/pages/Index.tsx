import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import parkingHero from '@/assets/parking-hero.jpg';
import parkingIcon from '@/assets/parking-icon.png';

interface ParkingLot {
  id: string;
  name: string;
  distance: string;
  availableSlots: number;
  totalSlots: number;
  pricePerHour: number;
}

const Index = () => {
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
    },
    {
      id: '2',
      name: 'City Center Mall',
      distance: '450m',
      availableSlots: 8,
      totalSlots: 75,
      pricePerHour: 25,
    },
    {
      id: '3',
      name: 'Business District',
      distance: '680m',
      availableSlots: 22,
      totalSlots: 100,
      pricePerHour: 35,
    },
    {
      id: '4',
      name: 'Shopping Plaza',
      distance: '1.2km',
      availableSlots: 5,
      totalSlots: 60,
      pricePerHour: 20,
    }
  ];

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-500';
    if (percentage > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleSearch = () => {
    // Search functionality can be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <img src={parkingIcon} alt="Parkin Today" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Parkin Today</h1>
        </div>
        <Button variant="glass" size="sm" onClick={() => navigate('/login')}>
          Profile
        </Button>
      </header>

      {/* Hero Section with Search */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={parkingHero} 
          alt="Parking lot" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Search Bar Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-center text-white space-y-3">
              <h2 className="text-4xl font-bold">Find Your Perfect Parking</h2>
              <p className="text-xl opacity-90">Smart parking solutions at your fingertips</p>
            </div>
            
            {/* Translucent Search Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                  <Input
                    type="text"
                    placeholder="Search for parking locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-white/20 border-white/30 text-white placeholder-white/70 text-lg h-14"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg"
                  className="px-8 h-14"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Lots Section */}
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Parking Lots</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">3km</div>
            <div className="text-sm text-muted-foreground">Search Radius</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary mb-1">₹25</div>
            <div className="text-sm text-muted-foreground">Avg. Price/hr</div>
          </Card>
        </div>

        {/* Parking Lots List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold">Available Parking</h2>
          
          {parkingLots.map((lot) => (
            <Card key={lot.id} className="hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="text-lg font-semibold">{lot.name}</h3>
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
                      <Button size="sm">
                        Park Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
