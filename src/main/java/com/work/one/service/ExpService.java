package com.work.one.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.work.one.to.ExperimentResult;
import com.work.one.to.Experiment;

/**
 * 
 * Service responsible for all Experiment related functions.
 * 
 * Service can be used to CRUD experiments and related properties/aspects.
 *
 */
public interface ExpService {

	/**
	 * Add new experiment to the list
	 * @param exp
	 * @return
	 */
	public ExperimentResult addExperiment(Experiment exp);

	/**
	 * Update experiment details
	 * @param exp
	 * @return
	 */
	public ExperimentResult updateExperiment(Experiment exp);

	/**
	 * View experiment details
	 * @param experimentId
	 * @return
	 */
	public ExperimentResult viewExperiment(Long experimentId);

	/**
	 * View experiment for a given name
	 * @param name
	 * @return
	 */
	public ExperimentResult viewExperiment(String name);

	/**
	 * Mark certain experiment as inactive.
	 * @param expId
	 * @return
	 */
	public ExperimentResult removeExperiment(long expId);

	/**
	 * Get list of all experiments.
	 * @return
	 */
	public List<Experiment> getExperiments() ;

	/**
	 * Get paged listing of experiments.
	 * 
	 * @param pageable
	 * @return
	 */
	Page<Experiment> getExperiments(Pageable pageable);

}
