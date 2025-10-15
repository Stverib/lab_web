package com.lut.ailab.service;

import com.lut.ailab.mapper.NoticesRepository;
import com.lut.ailab.pojo.dto.NoticesPageQueryDTO;
import com.lut.ailab.pojo.entity.Notices;
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
public class NoticesService {

    @Autowired
    private NoticesRepository noticesRepository;

    /**
     * 分页查询通知公告
     */
    public Page<Notices> pageQuery(NoticesPageQueryDTO noticesPageQueryDTO) {
        int pageNum = noticesPageQueryDTO.getPageNum();
        int pageSize = noticesPageQueryDTO.getPageSize();
        String sortField = noticesPageQueryDTO.getSortField();
        String sortDirection = noticesPageQueryDTO.getSortDirection();
        Integer status = noticesPageQueryDTO.getStatus();

        Sort.Direction direction = "DESC".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        if (status != null) {
            return noticesRepository.findByStatusOrderByIsTopDescNoticeTimeDesc(status, pageable);
        } else {
            return noticesRepository.findAll(pageable);
        }
    }

    /**
     * 获取最新通知公告
     */
    public List<Notices> getLatestNotices(Integer limit) {
        List<Notices> notices = noticesRepository.findByStatusOrderByIsTopDescNoticeTimeDesc(1);
        return notices.stream().limit(limit).toList();
    }

    /**
     * 根据ID获取通知公告
     */
    public Notices getById(String id) {
        Optional<Notices> optional = noticesRepository.findById(id);
        return optional.orElse(null);
    }

    /**
     * 保存通知公告
     */
    public Notices save(Notices notices) {
        if (notices.getCreateTime() == null) {
            notices.setCreateTime(LocalDateTime.now());
        }
        notices.setUpdateTime(LocalDateTime.now());
        return noticesRepository.save(notices);
    }

    /**
     * 删除通知公告
     */
    public void deleteById(String id) {
        noticesRepository.deleteById(id);
    }
}