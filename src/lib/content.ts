import site from "../../content/site.json";
import especialidades from "../../content/especialidades.json";
import salas from "../../content/salas.json";

export type Unit = (typeof site.units)[number];
export type Specialty = (typeof especialidades)[number];
export type Room = (typeof salas)[number];

export function getSite() {
  return site;
}

export function getEspecialidades() {
  return especialidades;
}

export function getEspecialidade(slug: string) {
  return especialidades.find((item) => item.slug === slug);
}

export function getSalas() {
  return salas;
}

export function getPrimaryWhatsapp() {
  return site.units[0].whatsapp;
}
