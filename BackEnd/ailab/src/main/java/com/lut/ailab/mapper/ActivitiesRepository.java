package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.Activities;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivitiesRepository extends MongoRepository<Activities, String> {
    
    /**
     * 根据状态和类型查询活动
     */
    List<Activities> findByStatusAndTypeOrderByActivityTimeDesc(Integer status, String type);
    
    /**
     * 分页查询活动
     */
    Page<Activities> findByStatusAndTypeOrderByActivityTimeDesc(Integer status, String type, Pageable pageable);
}
