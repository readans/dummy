import { Temporal } from "@js-temporal/polyfill";

function formatDate(isoString: string) {
  const zonedDateTime = Temporal.Instant.from(isoString).toZonedDateTimeISO("UTC");
  return `${zonedDateTime.day.toString().padStart(2, "0")}/${zonedDateTime.month.toString().padStart(2, "0")}/${zonedDateTime.year.toString().slice(-2)}`;
}

function formatRelativeTime(isoString: string): string {
  const now = Temporal.Now.instant();
  const postTime = Temporal.Instant.from(isoString);
  const diff = now.since(postTime, { largestUnit: "hour" });

  if (diff.total({ unit: "minutes" }) < 1) return "Justo ahora";
  if (diff.total({ unit: "hours" }) < 1) return `Hace ${Math.floor(diff.total({ unit: "minutes" }))} min`;
  if (diff.total({ unit: "days" }) < 1) return `Hoy a las ${postTime.toZonedDateTimeISO("UTC").toPlainTime().toString().slice(0, 5)}`;
  if (diff.total({ unit: "days" }) < 7) return `${postTime.toZonedDateTimeISO("UTC").toPlainDate().toString()} a las ${postTime.toZonedDateTimeISO("UTC").toPlainTime().toString().slice(0, 5)}`;

  return postTime.toZonedDateTimeISO("UTC").toPlainDate().toString(); // Formato YYYY-MM-DD por defecto
}

export { formatDate, formatRelativeTime }
