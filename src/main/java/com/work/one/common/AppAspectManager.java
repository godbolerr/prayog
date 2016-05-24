package com.work.one.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
@Aspect
@Component
public class AppAspectManager {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppAspectManager.class);

    @Around("execution(* com.work.one..*Service.*(..))")
    public Object profile(ProceedingJoinPoint pjp) throws Throwable {

        LOGGER.debug("IN:" + pjp);

        Object[] args = pjp.getArgs();

        if (args.length > 0) {

            for (int i = 0; i < args.length; i++) {
                LOGGER.debug("ARG:" + (i + 1) + ":" + args[i]);
            }
        }

        StopWatch sw = new StopWatch(getClass().getSimpleName());
        try {
            sw.start(pjp.getSignature().getName());
            return pjp.proceed();
        } finally {
            sw.stop();
            LOGGER.debug(sw.prettyPrint());
        }

    }

}
