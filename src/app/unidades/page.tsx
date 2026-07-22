import { redirect } from "next/navigation";

/** Mantido para URLs antigas — conteúdo unificado em /contato */
export default function UnidadesPage() {
  redirect("/contato");
}
