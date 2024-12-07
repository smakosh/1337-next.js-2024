import { Navigation } from "@/app/travel/_components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCurrentUser } from "@/lib/get-current-user";
import { Plane, Train, Bus, Ship } from "lucide-react";
import { createTrip } from "@/app/travel/trip/_actions/create-trip";
import { SubmitButton } from "@/app/(auth)/_components/submit-button";
import { Textarea } from "@/components/ui/textarea";

export default async function NewTripPage() {
  const user = await getCurrentUser();
  const handleCreateTrip = createTrip.bind(null, user?.id);

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Create New Trip</h1>
      <Card>
        <form action={handleCreateTrip}>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Enter the details of your new trip
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <RadioGroup
                defaultValue="airplane"
                id="vehicleType"
                name="vehicleType"
              >
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="airplane" id="airplane" />
                    <Label htmlFor="airplane">
                      <Plane className="h-4 w-4" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="train" id="train" />
                    <Label htmlFor="train">
                      <Train className="h-4 w-4" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bus" id="bus" />
                    <Label htmlFor="bus">
                      <Bus className="h-4 w-4" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ferry" id="ferry" />
                    <Label htmlFor="ferry">
                      <Ship className="h-4 w-4" />
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                name="from"
                placeholder="Departure location"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">To</Label>
              <Input id="to" name="to" placeholder="Destination" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="day">Date</Label>
              <Input id="day" name="day" type="date" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="image">Trip image</Label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                defaultValue="https://images.unsplash.com/photo-1733160972444-b31eb430072b?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Trip description</Label>
              <Textarea
                placeholder="Trip description..."
                id="description"
                name="description"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton
              title="Create Trip"
              pendingMessage="Creating your trip..."
              className="w-full"
            />
          </CardFooter>
        </form>
      </Card>
      <Navigation />
    </div>
  );
}
