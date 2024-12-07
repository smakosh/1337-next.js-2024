import { Navigation } from "@/pages/old-travel/_components/navigation";
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
import { Plane, Train, Bus, Ship } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { GetServerSideProps } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [image, setImage] = useState<string>(
    "https://images.unsplash.com/photo-1733160972444-b31eb430072b?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [description, setDescription] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      // @TODO: error handling + switch this to useActionState
      await fetch("/api/trip", {
        method: "POST",
        body: JSON.stringify({
          vehicleType,
          from,
          to,
          day,
          time,
          image,
          description,
        }),
      });
      router.push("/old-travel");
    });
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Create New Trip</h1>
      <Card>
        <form method="post" action={handleSubmit}>
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
                onValueChange={(value) => setVehicleType(value)}
                value={vehicleType}
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
                onChange={(e) => setFrom(e.currentTarget.value)}
                value={from}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                name="to"
                placeholder="Destination"
                onChange={(e) => setTo(e.currentTarget.value)}
                value={to}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="day">Date</Label>
              <Input
                id="day"
                name="day"
                type="date"
                value={day}
                onChange={(e) => setDay(e.currentTarget.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.currentTarget.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="image">Trip image</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.currentTarget.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Trip description</Label>
              <Textarea
                placeholder="Trip description..."
                id="description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                name="description"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Trip"}
            </Button>
          </CardFooter>
        </form>
      </Card>
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
        user: null,
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
        user: null,
      },
    };
  }

  const serializedUser = {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.createdAt.toISOString(),
  };

  return {
    props: {
      user: serializedUser,
    },
  };
}) satisfies GetServerSideProps<{
  user: Omit<User, "createdAt" | "updatedAt"> | null;
}>;
