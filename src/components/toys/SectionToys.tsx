"use client";

import { useEffect, useState } from "react";
import { ToyProp } from "@/components/toys/ToyProp";
import {
  getSectionToys,
  type ToySectionId,
  type ToyViewport,
} from "@/lib/toys";

type SectionToysProps = {
  section: ToySectionId;
};

export function SectionToys({ section }: SectionToysProps) {
  const [viewport, setViewport] = useState<ToyViewport>("mobile");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setViewport(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const items = getSectionToys(section, viewport);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <ToyProp
          key={`${section}-${item.id}-${item.placement}`}
          id={item.id}
          placement={item.placement}
          size={item.size}
        />
      ))}
    </>
  );
}
