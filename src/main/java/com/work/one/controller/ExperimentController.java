package com.work.one.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.work.one.service.ExpService;
import com.work.one.to.Experiment;
import com.work.one.to.ExperimentResult;

@RestController
@RequestMapping(value = "/rest/experiments")
public class ExperimentController {

	static Logger logger = LoggerFactory.getLogger(ExperimentController.class);
	
	@Autowired
	ExpService expService;

	@RequestMapping(method = RequestMethod.POST, produces = { "application/json" })	
	public ExperimentResult createExperiment(@RequestBody Experiment exp) {

		return expService.addExperiment(exp);

	}
	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = { "application/json" })		
	public ExperimentResult getExperiment(@PathVariable("id") Long id)  {      
		return expService.viewExperiment(id);
	}

	

	@RequestMapping(method = RequestMethod.PATCH)	
	public ExperimentResult updateExperimentDetails(@RequestBody Experiment exp) {
		return expService.updateExperiment(exp);

	}

	@RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)	
	public ExperimentResult deleteExperiment(@PathVariable("id") Long expId) {
		
		return expService.removeExperiment(expId);
	}
	


	@RequestMapping(method = RequestMethod.GET)	
	public List<Experiment> getExperiments() {
	
		return expService.getExperiments();

	}
	
}
