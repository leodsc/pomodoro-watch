package com.pomodorotimer.dto;

public enum SecondsFormat {
        SECOND (1),
        MINUTE (60),
        HOUR (3600),
        DAY (86400);

        private final int seconds;

        SecondsFormat(int seconds) {
            this.seconds = seconds;
        }

        int getSeconds() {
            return seconds;
        }
        
        static SecondsFormat getFormat(Long totalSeconds) {
                if (totalSeconds >= DAY.getSeconds()) {
                        return DAY;
                } else if (totalSeconds >= HOUR.getSeconds()) {
                        return HOUR;
                } else if (totalSeconds >= MINUTE.getSeconds()) {
                        return MINUTE;
                }
                return SECOND;
        }
}
