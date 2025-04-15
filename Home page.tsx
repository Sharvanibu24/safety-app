import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import LocationTracker from "@/components/LocationTracker";

const HomePage = () => {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-safehaven-light p-4 rounded-full mb-3">
          <Shield className="h-12 w-12 text-safehaven-DEFAULT" />
        </div>
        <h1 className="text-2xl font-bold text-center">Welcome to Safe Haven</h1>
        <p className="text-gray-500 text-center mt-1">Your personal safety companion</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex justify-center">
          <SOSButton className="w-32 h-32" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-2">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start" asChild>
              <a href="/contacts">Emergency Contacts</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/safeplaces">Find Safe Places</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/keywords">My Keywords</a>
            </Button>
            <Button variant="outline" className="justify-start">Safety Tips</Button>
          </div>
        </div>

        <LocationTracker />
      </div>
    </div>
  );
};

export default HomePage;
