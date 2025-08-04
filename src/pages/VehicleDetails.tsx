import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, ArrowLeft } from 'lucide-react';
import parkingIcon from '@/assets/parking-icon.png';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSave = () => {
    if (licensePlate && vehicleType) {
      // Save vehicle details logic here
      console.log('Vehicle details saved:', { licensePlate, vehicleType });
      
      // Navigate to home page after saving details
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-bg-secondary p-4">
      {/* Back Button */}
      <div className="mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
            <img src={parkingIcon} alt="Parkin Today" className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parkin Today</h1>
          <p className="body-small">Complete your profile</p>
        </div>

        {/* Vehicle Details Form */}
        <Card className="p-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <Car className="w-6 h-6" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* License Plate Input */}
            <div className="space-y-2">
              <label className="body-small font-medium">License Plate Number</label>
              <Input
                type="text"
                placeholder="e.g., ABC-1234"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider"
              />
            </div>

            {/* Vehicle Type Dropdown */}
            <div className="space-y-2">
              <label className="body-small font-medium">Vehicle Type</label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Save Button */}
            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!licensePlate || !vehicleType}
            >
              Save & Continue
            </Button>

            <p className="body-small text-center text-muted-foreground">
              This information helps us provide better parking recommendations
            </p>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;