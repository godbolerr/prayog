package com.work.one.config;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.work.one.exception.AccessDeniedExceptionHandler;

@Configuration
@EnableTransactionManagement
@ComponentScan(basePackages = {"com.work.one.service", "com.work.one.common","com.work.one.util"})
@PropertySource("classpath:application.properties")
@Import({ PersistenceContext.class })
public class RootConfig {
	
    static Logger logger = LoggerFactory.getLogger(RootConfig.class);
    
    @Resource
    private Environment env;
  
    @Bean 
    AccessDeniedExceptionHandler accessDeniedExceptionHandler() {
        AccessDeniedExceptionHandler accessDeniedExceptionHandler = new AccessDeniedExceptionHandler();
        accessDeniedExceptionHandler.setErrorPage("/error/accessDeniedPage");
        return accessDeniedExceptionHandler;
    }
    
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasename("messages");
        return source;
    }
    
    
}