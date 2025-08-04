import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowLeft, MapPin, Clock, Star } from 'lucide-react';

interface RecentPlace {
  id: string;
  name: string;
  address: string;
  lastVisited: string;
  rating: number;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock recent places data
  const recentPlaces: RecentPlace[] = [
    {
      id: '1',
      name: 'Marina Bay Parking',
      address: 'Marina Bay Sands, Singapore',
      lastVisited: '2 days ago',
      rating: 4.5
    },
    {
      id: '2',
      name: 'City Center Mall',
      address: 'Orchard Road, Singapore',
      lastVisited: '1 week ago',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Business District',
      address: 'Raffles Place, Singapore',
      lastVisited: '2 weeks ago',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Shopping Plaza',
      address: 'Bugis Street, Singapore',
      lastVisited: '3 weeks ago',
      rating: 4.0
    }
  ];

  // Mock search results
  const searchResults = searchQuery ? [
    {
      id: 'search-1',
      name: `${searchQuery} Parking Center`,
      address: `${searchQuery} Area, Singapore`,
      lastVisited: 'Search Result',
      rating: 4.3
    },
    {
      id: 'search-2', 
      name: `${searchQuery} Mall Parking`,
      address: `Near ${searchQuery}, Singapore`,
      lastVisited: 'Search Result',
      rating: 4.1
    }
  ] : [];

  const handleSearch = () => {
    // Search results will be shown below
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="title-large">Search Parking</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for parking locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch}
            size="lg"
            className="px-6 h-12"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Search Results</h2>
          
          {searchResults.map((place) => (
            <Card key={place.id} className="hover:scale-[1.02] transition-transform cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">{place.name}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{place.address}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">{place.lastVisited}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/slot-selection/${place.id}`)}
                  >
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Places */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Places</h2>
        
        {recentPlaces.map((place) => (
          <Card key={place.id} className="hover:scale-[1.02] transition-transform cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">{place.name}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{place.address}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{place.lastVisited}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/slot-selection/${place.id}`)}
                >
                  Select
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;