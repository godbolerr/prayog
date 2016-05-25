package com.work.one.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LinkController {
	static Logger logger = LoggerFactory.getLogger(LinkController.class);

	@RequestMapping(value = "/{[path:[^\\.]*}")
	public String redirect() {
		return "forward:/";
	}

	@RequestMapping("/user")
	@ResponseBody
	public Principal user(Principal user) {
		return user;
	}

}
