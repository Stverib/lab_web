package com.lut.ailab.mapper;

import com.lut.ailab.pojo.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {

    /**
     * 【分页查询的核心方法】
     * Spring Data 会自动根据方法名 (findByUserID) 生成查询逻辑，
     * 并结合 Pageable 参数实现 MongoDB 的 skip/limit 分页。
     * * @param userID 要查询的用户ID
     * @param pageable 包含分页（页码、大小）和排序信息
     * @return 包含查询结果和分页元信息的 Page 对象
     */
    //Page<News> pageQuery(long userID, Pageable pageable);
}