import { timeFormat } from "../types/TTime";
import { DateTime } from 'luxon';

export const formatTime = (epochTime: number, type: timeFormat) => {
    const dateTime = DateTime.fromSeconds(epochTime);

    return dateTime.toFormat(type)
}