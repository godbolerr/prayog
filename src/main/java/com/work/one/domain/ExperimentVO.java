package com.work.one.domain;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

@Entity
@Audited
@Table(name = "WO_EXPERIMENT")
public class ExperimentVO extends WorkItem implements Serializable {

	private static final long serialVersionUID = 96285180113476324L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Basic(optional = false)
	@Column(name = "ID", nullable = false)
	protected Long id;

	@Column(name = "NAME", length = 100)
	private String name;

	@Column(name = "SUMMARY", length = 250)
	private String summary;
	
	/**
	 * Duration in minutes
	 */
	private int duration;
	
	/**
	 * Difficulty level 1- easy , 2-medium , 3- difficult
	 */
	private int level;
	
	/**
	 * Prerequisites : Needs to expanded furthter, What experiments should have been performed earlier ?
	 */
	private String precondition;
	
	/**
	 * How much it might cost for materials.
	 */
	private double moneyValue;
	
	/**
	 * What precautions must be taken ?
	 */
	private String safeTyInstructions;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	/**
	 * To construct an object with default values.
	 */
	public ExperimentVO() {
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the summary
	 */
	public String getSummary() {
		return summary;
	}

	/**
	 * @param summary
	 *            the summary to set
	 */
	public void setSummary(String summary) {
		this.summary = summary;
	}

	/**
	 * @return the duration
	 */
	public int getDuration() {
		return duration;
	}

	/**
	 * @param duration the duration to set
	 */
	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getPrecondition() {
		return precondition;
	}

	public void setPrecondition(String precondition) {
		this.precondition = precondition;
	}

	public double getMoneyValue() {
		return moneyValue;
	}

	public void setMoneyValue(double moneyValue) {
		this.moneyValue = moneyValue;
	}

	public String getSafeTyInstructions() {
		return safeTyInstructions;
	}

	public void setSafeTyInstructions(String safeTyInstructions) {
		this.safeTyInstructions = safeTyInstructions;
	}
	
	

}
