export function toHumanReadbleDate (s: string) {
    const date = new Date(s);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    }).format(date);

    return(formattedDate);
}