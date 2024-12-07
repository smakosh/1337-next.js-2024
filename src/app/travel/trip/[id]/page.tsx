import { Navigation } from "@/app/travel/_components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/get-current-user";
import { prisma } from "@/lib/prisma";
import { Plane, Train, Bus, Ship } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  const tripId = (await params).id;

  if (!user) {
    redirect("/");
  }

  const trip = await prisma.trip.findFirst({
    where: {
      userId: user.id,
      AND: {
        id: tripId,
      },
    },
  });

  if (!trip) {
    notFound();
  }

  const icons = {
    airplane: Plane,
    train: Train,
    bus: Bus,
    ferry: Ship,
  };
  const Icon = icons[trip.type as keyof typeof icons];

  return (
    <div className="container mx-auto px-4 pb-20">
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {trip.from} to {trip.to}
            </span>
            <Icon className="h-6 w-6" />
          </CardTitle>
          <CardDescription>
            {trip.day} at {trip.time}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Image
              src={trip.image}
              alt="Trip Image"
              width={800}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            <p>{trip.description}</p>
          </div>
        </CardContent>
      </Card>
      <Navigation />
    </div>
  );
}
