package com.work.one.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AppListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppListener.class);

    public void processMessage(String content) {
        LOGGER.info("Received contents from someQueue " + content);
    }

}
