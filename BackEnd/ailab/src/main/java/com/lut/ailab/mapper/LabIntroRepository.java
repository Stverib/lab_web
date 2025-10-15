package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.LabIntro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabIntroRepository extends MongoRepository<LabIntro, String> {
    
    /**
     * 根据状态和页面类型查询内容
     */
    List<LabIntro> findByStatusAndPageTypeOrderBySortOrderAsc(Integer status, Integer pageType);
    
    /**
     * 分页查询内容
     */
    Page<LabIntro> findByStatusAndPageTypeOrderBySortOrderAsc(Integer status, Integer pageType, Pageable pageable);
}






