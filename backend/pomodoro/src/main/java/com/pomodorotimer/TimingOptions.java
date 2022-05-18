package com.pomodorotimer;

import org.springframework.beans.factory.annotation.Autowired;

public enum TimingOptions {
        HOURLY ("hourly"),
        DAILY ("daily"),
        WEEKLY ("weekly"),
        MONTHLY ("monthly"),
        YEARLY ("yearly");

        private final String timing;

        TimingOptions(String timing) {
            this.timing = timing;
        }

        public String getTiming() {
            return timing;
        }
}
