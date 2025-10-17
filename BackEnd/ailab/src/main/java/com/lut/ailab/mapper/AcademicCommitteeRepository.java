package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.AcademicCommittee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicCommitteeRepository extends MongoRepository<AcademicCommittee, String> {
    List<AcademicCommittee> findByStatusOrderBySortOrderAsc(Integer status);
    Page<AcademicCommittee> findByStatusOrderBySortOrderAsc(Integer status, Pageable pageable);
}






