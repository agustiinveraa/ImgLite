"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3d";
import DonutImg from "../../assets/hero.webp";

export function HeroCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black bg-opacity-20 border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          Convert your image to any format you need
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-neutral-300"
        >
          Without losing quality.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={DonutImg}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="/docs"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
          >
            How to use →
          </CardItem>

          <CardItem
            translateZ={20}
            as="a"
            href="#form"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#form")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
          >
            Try now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
