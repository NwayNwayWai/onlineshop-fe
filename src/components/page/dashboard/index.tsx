"use client";
import { Box, Card, Grid, Text } from "@radix-ui/themes";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
import { topItems } from "@/data/mock-data";
import SaleItem from "@/components/shared/sale-item";
import Link from "next/link";

const Dashboard = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  const images = [
    "/upload/icons/dashboard/dashboard_image1.png",
    "/upload/icons/dashboard/dashboard_image2.png",
    "/upload/icons/dashboard/dashboard_image3.png",
    "/upload/icons/dashboard/dashboard_image4.png",
  ];
  return (
    <Box className="w-full ">
      <Box className="w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="w-full rounded-lg">
                <Box className="w-full rounded-lg">
                  <Card>
                    <CardContent>
                      <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-[300px]  pt-3  object-contain"
                      />
                    </CardContent>
                  </Card>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Box>

      <Box className="p-2">
        <Grid columns="3" className="p-1 " gap="6">
          {topItems.map((item, index) => (
            <Link href={`/dashboard/${item.id}`} key={index}>
              <SaleItem item={item} index={index} />
            </Link>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
