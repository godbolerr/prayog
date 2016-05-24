package com.work.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.work.one.domain.ExperimentVO;

public interface ExperimentRepository extends JpaRepository<ExperimentVO, Long> {

	ExperimentVO findByName(String name);
}
