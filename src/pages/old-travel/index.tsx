import { Plane, Train, Bus, Ship, Trash } from "lucide-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Trip } from "@prisma/client";
import { Navigation } from "./_components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function TripCard({ trip }: { trip: Trip }) {
  const router = useRouter();
  const icons = {
    airplane: Plane,
    train: Train,
    bus: Bus,
    ferry: Ship,
  };
  const Icon = icons[trip.type as keyof typeof icons];

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      // @TODO: error handling + switch this to useActionState
      await fetch(`/api/trip?tripId=${trip.id}`, {
        method: "DELETE",
      });

      router.refresh();
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Link href={`/old-travel/trip/${trip.id}`}>
          <CardTitle className="text-sm font-medium">
            {trip.from} to {trip.to}
          </CardTitle>
        </Link>
        <div className="inline-flex flex-col items-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <form method="post" action={handleDelete}>
            <Button disabled={isPending} size="icon" variant="link">
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

export default function DashboardPage({
  trips,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps = (async (context) => {
  const cookies = context.req.headers.cookie || "";
  const userCookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("travel-app="))
    ?.split("=")[1];

  if (!userCookie) {
    return {
      redirect: {
        destination: "/login",
      },
      props: {
        trips: [],
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userCookie,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
      props: {
        trips: [],
      },
    };
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    props: {
      trips,
    },
  };
}) satisfies GetServerSideProps<{ trips: Trip[] }>;
