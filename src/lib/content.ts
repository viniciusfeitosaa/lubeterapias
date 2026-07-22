import site from "../../content/site.json";
import especialidades from "../../content/especialidades.json";
import salas from "../../content/salas.json";
import equipe from "../../content/equipe.json";

export type Unit = (typeof site.units)[number];
export type Specialty = (typeof especialidades)[number];
export type SpecialtyCategory = Specialty["category"];
export type Room = (typeof salas)[number];
export type TeamMember = (typeof equipe)[number];

export const SPECIALTY_CATEGORY_LABELS: Record<SpecialtyCategory, string> = {
  especialidades: "Especialidades",
  grupos: "Grupos",
  esportes: "Esportes",
};

export const SPECIALTY_CATEGORY_ORDER: SpecialtyCategory[] = [
  "especialidades",
  "grupos",
  "esportes",
];

export function getSite() {
  return site;
}

export function getEspecialidades() {
  return especialidades;
}

export function getEspecialidadesByCategory(category: SpecialtyCategory) {
  return especialidades.filter((item) => item.category === category);
}

export function getEspecialidade(slug: string) {
  return especialidades.find((item) => item.slug === slug);
}

export function getSalas() {
  return salas;
}

export function getEquipe() {
  return equipe;
}

export function getPrimaryWhatsapp() {
  return site.units[0].whatsapp;
}
