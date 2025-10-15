package com.lut.ailab.service;

import com.lut.ailab.mapper.NewsRepository;
import com.lut.ailab.pojo.dto.NewsPageQueryDTO;
import com.lut.ailab.pojo.entity.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;
    /**
     * 根据用户ID获取分页的新闻链接列表
     * @param newsPageQueryDTO
     * @return 分页后的新闻链接结果
     */
    public Page<News> pageQuery(NewsPageQueryDTO newsPageQueryDTO) {

        //获取参数
        String userID = newsPageQueryDTO.getUserId();
        int pageNum = newsPageQueryDTO.getPageNum();
        int pageSize = newsPageQueryDTO.getPageSize();
        String sortField = newsPageQueryDTO.getSortField();
        String sortDirection = newsPageQueryDTO.getSortDirection();

        //构造排序对象
        Sort.Direction direction = "DESC".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        // 3. 构造 Pageable 对象 (页码从 0 开始)
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        // 4. 调用 Repository 执行分页查询
        // 假设 Spring Data Repository 的查询方法是 pageQuery
        return newsRepository.findAll(pageable);
    }
}