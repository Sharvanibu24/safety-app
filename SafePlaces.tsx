import { useState } from "react";
import { MapPin, Building, Shield, Search, Home, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface SafePlace {
  id: string;
  name: string;
  address: string;
  distance: string;
  type: "police" | "hospital" | "shelter" | "public";
  phone: string;
  hours: string;
}

const SAFE_PLACES: SafePlace[] = [
  {
    id: "1",
    name: "Central Police Station",
    address: "123 Safety Ave, Downtown",
    distance: "0.8 miles",
    type: "police",
    phone: "(555) 123-4567",
    hours: "24 hours",
  },
  {
    id: "2",
    name: "Memorial Hospital",
    address: "456 Health Dr, Midtown",
    distance: "1.2 miles",
    type: "hospital",
    phone: "(555) 987-6543",
    hours: "24 hours",
  },
  {
    id: "3",
    name: "Women's Support Center",
    address: "789 Haven St, Eastside",
    distance: "1.5 miles",
    type: "shelter",
    phone: "(555) 234-5678",
    hours: "8am - 8pm",
  },
  {
    id: "4",
    name: "City Library",
    address: "101 Knowledge Rd, Westside",
    distance: "0.5 miles",
    type: "public",
    phone: "(555) 345-6789",
    hours: "9am - 9pm",
  },
  {
    id: "5",
    name: "Community Center",
    address: "202 Gathering Pl, Northside",
    distance: "1.7 miles",
    type: "public",
    phone: "(555) 456-7890",
    hours: "7am - 10pm",
  },
];

const SafePlacesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Filter safe places based on search query and selected type
  const filteredPlaces = SAFE_PLACES.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          place.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || place.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Function to get the icon for each type of safe place
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "police":
        return <Shield className="text-blue-600" size={18} />;
      case "hospital":
        return <Building className="text-red-600" size={18} />;
      case "shelter":
        return <Home className="text-purple-600" size={18} />;
      case "public":
        return <Building className="text-green-600" size={18} />;
      default:
        return <MapPin className="text-gray-600" size={18} />;
    }
  };

  // Function to get a human-readable label for each type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "police":
        return "Police";
      case "hospital":
        return "Hospital";
      case "shelter":
        return "Shelter";
      case "public":
        return "Public";
      default:
        return type;
    }
  };

  // Function to get the badge color for each type
  const getTypeBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "police":
        return "default";
      case "hospital":
        return "destructive";
      case "shelter":
        return "secondary";
      case "public":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="pt-20 pb-24 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Nearby Safe Places</h1>
        <p className="text-gray-500">Find safe locations near your current position</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Search for safe places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            All
          </Button>
          <Button
            variant={selectedType === "police" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("police")}
          >
            Police
          </Button>
          <Button
            variant={selectedType === "hospital" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("hospital")}
          >
            Hospitals
          </Button>
          <Button
            variant={selectedType === "shelter" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("shelter")}
          >
            Shelters
          </Button>
          <Button
            variant={selectedType === "public" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("public")}
          >
            Public
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="font-medium text-lg">No places found</h3>
            <p className="mt-1">Try a different search term or filter</p>
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <div 
              key={place.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      {getTypeIcon(place.type)}
                      <h3 className="font-semibold ml-2">{place.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{place.address}</p>
                    
                    <div className="flex items-center mt-2">
                      <Badge variant={getTypeBadgeVariant(place.type)}>
                        {getTypeLabel(place.type)}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {place.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="p-4 bg-gray-50 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Phone size={14} className="text-gray-500 mr-2" />
                  {place.phone}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="text-gray-500 mr-2" />
                  {place.hours}
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin size={16} className="mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SafePlacesPage;
