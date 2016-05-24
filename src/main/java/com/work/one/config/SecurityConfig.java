package com.work.one.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.work.one.exception.AccessDeniedExceptionHandler;

@Configuration
@EnableWebSecurity 
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth
        .inMemoryAuthentication()
            .withUser("user@p.com").password("password").roles("USER");
    }
   
    @Autowired
    AccessDeniedExceptionHandler accessDeniedExceptionHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	  
        http.httpBasic().and().authorizeRequests()
        .antMatchers("/login").permitAll()
        .antMatchers("/index.html", "/home.html", "/login.html", "/").permitAll()
        .antMatchers("/resources/**").permitAll()
        .antMatchers("/partials/**").permitAll()
        .antMatchers("/fonts/**").permitAll()
        .antMatchers("/logout/**").permitAll()
        .antMatchers("/font-awesome/**").permitAll() 
        .anyRequest()
        .authenticated()
        .and().exceptionHandling().accessDeniedHandler(accessDeniedExceptionHandler).
        and().csrf().disable();
    }
    
   
}