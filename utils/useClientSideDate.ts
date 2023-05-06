import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export const useClientSideDate = (isoDate: string | null): string | null => {
  const [localDate, setLocalDate] = useState<string | null>(null);

  useEffect(() => {
    if (isoDate) {
      const dateTime = DateTime.fromISO(isoDate);
      setLocalDate(dateTime.isValid ? dateTime.toLocaleString() : null);
    } else {
      setLocalDate(null);
    }
  }, [isoDate]);

  return localDate;
};
