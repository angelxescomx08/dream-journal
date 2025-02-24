import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: Date | string | number) {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}
