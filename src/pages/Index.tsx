import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star } from 'lucide-react';
import parkingHero from '@/assets/parking-hero.jpg';
import parkingIcon from '@/assets/parking-icon.png';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/map', { state: { searchQuery } });
    }
  };

  const handleParkNow = () => {
    navigate('/map');
  };

  const handleFindBestSpot = () => {
    navigate('/map', { state: { findBestSpot: true } });
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

      {/* Quick Actions */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Button 
            onClick={handleParkNow}
            size="lg"
            className="h-16 text-lg"
          >
            <MapPin className="w-6 h-6 mr-2" />
            Park Now
          </Button>
          <Button 
            onClick={handleFindBestSpot}
            variant="glass"
            size="lg"
            className="h-16 text-lg"
          >
            <Star className="w-6 h-6 mr-2" />
            Find Best Spot
          </Button>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Search</h3>
            <p className="text-muted-foreground">Find available parking spots in real-time with our advanced search technology.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Live Availability</h3>
            <p className="text-muted-foreground">See real-time parking availability and reserve your spot before you arrive.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Best Rates</h3>
            <p className="text-muted-foreground">Compare prices and find the most affordable parking options in your area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
