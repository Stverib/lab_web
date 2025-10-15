package com.lut.ailab.service;

import com.lut.ailab.mapper.ActivitiesRepository;
import com.lut.ailab.pojo.dto.ActivitiesPageQueryDTO;
import com.lut.ailab.pojo.entity.Activities;
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
public class ActivitiesService {

    @Autowired
    private ActivitiesRepository activitiesRepository;

    /**
     * 分页查询学术活动
     */
    public Page<Activities> pageQuery(ActivitiesPageQueryDTO activitiesPageQueryDTO) {
        int pageNum = activitiesPageQueryDTO.getPageNum();
        int pageSize = activitiesPageQueryDTO.getPageSize();
        String sortField = activitiesPageQueryDTO.getSortField();
        String sortDirection = activitiesPageQueryDTO.getSortDirection();
        Integer status = activitiesPageQueryDTO.getStatus();
        String type = activitiesPageQueryDTO.getType();

        Sort.Direction direction = "DESC".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        if (status != null && type != null) {
            return activitiesRepository.findByStatusAndTypeOrderByActivityTimeDesc(status, type, pageable);
        } else if (status != null) {
            return activitiesRepository.findAll(pageable);
        } else {
            return activitiesRepository.findAll(pageable);
        }
    }

    /**
     * 获取最新学术活动
     */
    public List<Activities> getLatestActivities(Integer limit, String type) {
        List<Activities> activities = activitiesRepository.findByStatusAndTypeOrderByActivityTimeDesc(1, type);
        return activities.stream().limit(limit).toList();
    }

    /**
     * 根据ID获取活动
     */
    public Activities getById(String id) {
        Optional<Activities> optional = activitiesRepository.findById(id);
        return optional.orElse(null);
    }

    /**
     * 保存活动
     */
    public Activities save(Activities activities) {
        if (activities.getCreateTime() == null) {
            activities.setCreateTime(LocalDateTime.now());
        }
        activities.setUpdateTime(LocalDateTime.now());
        return activitiesRepository.save(activities);
    }

    /**
     * 删除活动
     */
    public void deleteById(String id) {
        activitiesRepository.deleteById(id);
    }
}