/**
 * 
 */
package com.work.one.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.work.one.domain.ExperimentVO;
import com.work.one.repository.ExperimentRepository;
import com.work.one.to.Experiment;
import com.work.one.to.ExperimentResult;
import com.work.one.to.Result;

/**
 * Responsible for managing experiment lifecycle.
 * 
 * @author Test
 *
 */
@Service
@Transactional
public class ExpServiceImpl implements ExpService {

	@Autowired
	ExperimentRepository expRepository;

	/**
	 * 
	 */
	public ExpServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.work.one.service.ExpService#addExperiment(com.work.one.to.Experiment)
	 */
	@Override
	public ExperimentResult addExperiment(Experiment exp) {

		ExperimentVO evo = new ExperimentVO();
		evo.setName(exp.getName());
		evo.setSummary(exp.getSummary());
		evo.setDuration(exp.getDuration());

		expRepository.save(evo);

		ExperimentResult result = new ExperimentResult();
		Result theResult = new Result();
		theResult.setStatus(true);
		result.setResult(theResult);
		exp.setId(evo.getId());
		result.setExperiment(exp);

		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.work.one.service.ExpService#updateExperiment(com.work.one.to.
	 * Experiment)
	 */
	@Override
	public ExperimentResult updateExperiment(Experiment exp) {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.work.one.service.ExpService#viewExperiment(java.lang.Long)
	 */
	@Override
	public ExperimentResult viewExperiment(Long experimentId) {

		ExperimentVO expVO = expRepository.findOne(experimentId);
		Result result = new Result();
		ExperimentResult expResult = new ExperimentResult();

		if (expVO == null) {

			result.setStatus(false);
			result.addMessage("No experiment found with id " + experimentId);

		} else {
			result.setStatus(true);

			/// TODO Bean copy is the way to go
			Experiment exp = new Experiment();
			exp.setDuration(expVO.getDuration());
			exp.setName(expVO.getName());
			exp.setSummary(expVO.getSummary());
			exp.setId(expVO.getId());

			expResult.setExperiment(exp);

		}

		return expResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.work.one.service.ExpService#viewExperiment(java.lang.String)
	 */
	@Override
	public ExperimentResult viewExperiment(String name) {
		ExperimentVO expVO = expRepository.findByName(name);
		Result result = new Result();
		ExperimentResult expResult = new ExperimentResult();

		if (expVO == null) {

			result.setStatus(false);
			result.addMessage("No experiment found with name provided :  " + name);

		} else {
			result.setStatus(true);

			/// TODO Bean copy is the way to go
			Experiment exp = new Experiment();
			exp.setDuration(expVO.getDuration());
			exp.setName(expVO.getName());
			exp.setSummary(expVO.getSummary());
			exp.setId(expVO.getId());

			expResult.setExperiment(exp);

		}

		return expResult;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.work.one.service.ExpService#removeExperiment(long)
	 */
	@Override
	public ExperimentResult removeExperiment(long expId) {

		Result result = new Result();
		ExperimentResult expResult = new ExperimentResult();
		expResult.setResult(result);
		
		ExperimentVO evo = expRepository.findOne(expId);
		
		if ( evo != null ) {
			expRepository.delete(evo);
			result.setStatus(true);
		} else {
			result.setStatus(false);
			result.addMessage("Experiment with id " + expId + " does not exists.");
		}
		
		
		return expResult;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.work.one.service.ExpService#getExperiments()
	 */
	@Override
	public List<Experiment> getExperiments() {
		
		List<Experiment> expList = new ArrayList<Experiment>();
		
		List<ExperimentVO> evoList = expRepository.findAll();
		
		for (ExperimentVO expVO : evoList) {
			Experiment exp = new Experiment();
			exp.setDuration(expVO.getDuration());
			exp.setName(expVO.getName());
			exp.setSummary(expVO.getSummary());
			exp.setId(expVO.getId());
			expList.add(exp);
		}
		
		return expList;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.work.one.service.ExpService#getExperiments(org.springframework.data.
	 * domain.Pageable)
	 */
	@Override
	public Page<Experiment> getExperiments(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

}
