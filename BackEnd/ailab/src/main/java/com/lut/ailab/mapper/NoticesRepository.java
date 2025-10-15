package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.Notices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticesRepository extends MongoRepository<Notices, String> {
    
    /**
     * 根据状态查询通知公告
     */
    List<Notices> findByStatusOrderByIsTopDescNoticeTimeDesc(Integer status);
    
    /**
     * 分页查询通知公告
     */
    Page<Notices> findByStatusOrderByIsTopDescNoticeTimeDesc(Integer status, Pageable pageable);
}






