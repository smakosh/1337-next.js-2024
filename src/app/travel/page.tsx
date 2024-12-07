import { Button } from "@/components/ui/button";
import { Navigation } from "./_components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/get-current-user";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import { Plane, Train, Bus, Ship, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteTrip } from "@/app/travel/trip/_actions/delete-trip";

function TripCard({ trip }: { trip: Trip }) {
  const deleteTripById = deleteTrip.bind(null, trip.id);
  const icons = {
    airplane: Plane,
    train: Train,
    bus: Bus,
    ferry: Ship,
  };
  const Icon = icons[trip.type as keyof typeof icons];

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Link href={`/travel/trip/${trip.id}`}>
          <CardTitle className="text-sm font-medium">
            {trip.from} to {trip.to}
          </CardTitle>
        </Link>
        <div className="inline-flex flex-col items-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <form action={deleteTripById}>
            <Button size="icon" variant="link">
              <Trash className="text-red-500 h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {trip.day} at {trip.time}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: user.id,
    },
  });
  const currentDate = new Date();

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.day) >= currentDate
  );
  const pastTrips = trips.filter((trip) => new Date(trip.day) < currentDate);

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Your Trips</h1>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {upcomingTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </TabsContent>
        <TabsContent value="past">
          {pastTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </TabsContent>
      </Tabs>
      <Navigation />
    </div>
  );
}
