import { Trip } from "@prisma/client";
import { Plane, Train, Bus, Ship } from "lucide-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { Navigation } from "@/pages/old-travel/_components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default function TripDetailPage({
  trip,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!trip) {
    return null;
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

export const getServerSideProps = (async (context) => {
  const tripId = context.params?.id;
  if (!tripId || typeof tripId !== "string") {
    return {
      notFound: true,
      props: {
        trip: null,
      },
    };
  }

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
        trip: null,
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
        trip: null,
      },
    };
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
    return {
      notFound: true,
      props: {
        trip: null,
      },
    };
  }

  return {
    props: {
      trip,
    },
  };
}) satisfies GetServerSideProps<{ trip: Trip | null }>;
