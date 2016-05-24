package com.work.one.service;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.work.one.config.RootConfig;
import com.work.one.exception.AppException;
import com.work.one.to.Experiment;
import com.work.one.to.ExperimentResult;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = RootConfig.class)
public class ExpServiceTest {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ExpServiceTest.class);

	@Autowired
	ApplicationContext applicationContext;
	
	@Autowired
	ExpService service;
	
	
	@Test
	public void createExperiment() throws AppException {
		
		LOGGER.info("Running test to create Experiment ....");
		
		Experiment exp = new Experiment();
		
		String name = "TestExp" + System.currentTimeMillis();
		
		exp.setName(name);
		exp.setSummary("Summary for " + name);
		exp.setDuration(30);
		
		ExperimentResult result = service.addExperiment(exp);
		
		
		assertTrue(result.getResult().isSuccessful() == true);
		assertTrue(result.getExperiment() != null );
		assertTrue(result.getExperiment().getId() > 0  );
		
		

	}
	
	
}
