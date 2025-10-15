package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.Carousel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarouselRepository extends MongoRepository<Carousel, String> {
    
    /**
     * 根据状态查询轮播图
     */
    List<Carousel> findByStatusOrderBySortOrderAsc(Integer status);
    
    /**
     * 分页查询轮播图
     */
    Page<Carousel> findByStatusOrderBySortOrderAsc(Integer status, Pageable pageable);
}






