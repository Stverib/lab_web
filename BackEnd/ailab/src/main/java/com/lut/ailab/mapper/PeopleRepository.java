package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.People;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PeopleRepository extends MongoRepository<People, String> {
    
    /**
     * 根据状态和类型查询人员
     */
    List<People> findByStatusAndTypeOrderBySortOrderAsc(Integer status, String type);
    
    /**
     * 分页查询人员
     */
    Page<People> findByStatusAndTypeOrderBySortOrderAsc(Integer status, String type, Pageable pageable);

    /**
     * 根据姓名与类型查询
     */
    Optional<People> findByNameAndType(String name, String type);
}
