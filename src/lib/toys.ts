import toys from "../../content/toys.json";

export type ToyId = (typeof toys.props)[number]["id"];
export type ToySize = "sm" | "md" | "lg";
export type ToyPlacement =
  | "hero-left"
  | "hero-right"
  | "section-tr"
  | "section-bl"
  | "section-edge";
export type ToySectionId = keyof typeof toys.sections;
export type ToyViewport = "desktop" | "mobile";

export type ToyDefinition = (typeof toys.props)[number];

export type ToyInstance = {
  id: ToyId;
  placement: ToyPlacement;
  size?: ToySize;
};

const propsById = Object.fromEntries(
  toys.props.map((prop) => [prop.id, prop]),
) as Record<ToyId, ToyDefinition>;

export function getToy(id: ToyId): ToyDefinition {
  const toy = propsById[id];
  if (!toy) {
    throw new Error(`Toy not found: ${id}`);
  }
  return toy;
}

export function getSectionToys(
  section: ToySectionId,
  viewport: ToyViewport,
): ToyInstance[] {
  const entry = toys.sections[section];
  if (!entry) return [];
  return entry[viewport] as ToyInstance[];
}

export function isToySectionId(value: string): value is ToySectionId {
  return value in toys.sections;
}
