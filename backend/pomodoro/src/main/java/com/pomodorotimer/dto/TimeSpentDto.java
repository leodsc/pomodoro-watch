package com.pomodorotimer.dto;

import com.pomodorotimer.TimingOptions;

import java.time.DayOfWeek;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class TimeSpentDto {
    private final Locale locale = new Locale("pt", "BR");
    private final List<Object> timeSpentDto = new ArrayList<>();
    private double convertedTotalSeconds;
    private SecondsFormat greaterFormat = SecondsFormat.SECOND;

    private record Daily(double totalTime, String timeUnit, SecondsFormat timeFormat) {}
    private record Monthly(double totalTime, String timeUnit, SecondsFormat timeFormat) {}
    private record Yearly(double totalTime, String timeUnit, SecondsFormat timeFormat) {}

    public List<?> transform(List<TimeTrack> timeTrack, TimingOptions timing) {
        defineGreaterSecondsFormat(timeTrack);
        for (TimeTrack timeSpent: timeTrack) {
            Long timeTotalSeconds = timeSpent.getTotalSeconds();
            convertedTotalSeconds = convertSeconds(timeTotalSeconds, greaterFormat);

            if (timing == TimingOptions.DAILY) {
                convertDay(timeSpent);
            } else if (timing == TimingOptions.MONTHLY) {
                convertMonth(timeSpent);
            } else {
                convertYear(timeSpent);
            }
        }
        return timeSpentDto;
    }

    private void defineGreaterSecondsFormat(List<TimeTrack> timeTrack) {
        for (TimeTrack time: timeTrack) {
            if (time.getTotalSeconds() > greaterFormat.getSeconds()) {
                greaterFormat = SecondsFormat.getFormat(time.getTotalSeconds());
            }
        }
    }

    private double convertSeconds(Long totalSeconds, SecondsFormat format) {
        return (double) totalSeconds/format.getSeconds();
    }

    private void convertDay(TimeTrack timeSpent) {
        DayOfWeek day = DayOfWeek.of(timeSpent.getTimeUnit());
        String dayName = day.getDisplayName(TextStyle.FULL, locale);
        var daily = new Daily(convertedTotalSeconds, dayName, greaterFormat);
        timeSpentDto.add(daily);
    }

    private void convertMonth(TimeTrack timeSpent) {
        Month monthName = Month.of(timeSpent.getTimeUnit());
        String timeMonthName = monthName.getDisplayName(TextStyle.FULL, locale);
        var month = new Monthly(convertedTotalSeconds, timeMonthName, greaterFormat);
        timeSpentDto.add(month);
    }

    private void convertYear(TimeTrack timeSpent) {
        String timeUnitConverted = timeSpent.getTimeUnit().toString();
        var yearObj = new Yearly(convertedTotalSeconds, timeUnitConverted, greaterFormat);
        timeSpentDto.add(yearObj);
    }
}
