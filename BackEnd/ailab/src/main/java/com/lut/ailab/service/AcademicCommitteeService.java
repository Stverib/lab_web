package com.lut.ailab.service;

import com.lut.ailab.mapper.AcademicCommitteeRepository;
import com.lut.ailab.pojo.entity.AcademicCommittee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AcademicCommitteeService {

    @Autowired
    private AcademicCommitteeRepository repository;

    public Page<AcademicCommittee> page(Integer pageNum, Integer pageSize, Integer status) {
        Pageable pageable = PageRequest.of(pageNum == null ? 0 : pageNum,
                pageSize == null ? 20 : pageSize,
                Sort.by(Sort.Direction.ASC, "sortOrder"));
        if (status != null) {
            return repository.findByStatusOrderBySortOrderAsc(status, pageable);
        }
        return repository.findAll(pageable);
    }

    public List<AcademicCommittee> list(Integer status) {
        if (status != null) return repository.findByStatusOrderBySortOrderAsc(status);
        return repository.findAll();
    }

    public AcademicCommittee getById(String id) {
        Optional<AcademicCommittee> opt = repository.findById(id);
        return opt.orElse(null);
    }

    public AcademicCommittee save(AcademicCommittee ac) {
        if (ac.getCreateTime() == null) ac.setCreateTime(LocalDateTime.now());
        ac.setUpdateTime(LocalDateTime.now());
        return repository.save(ac);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}






