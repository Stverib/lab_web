package com.lut.ailab.service;

import com.lut.ailab.mapper.PeopleRepository;
import com.lut.ailab.pojo.dto.PeoplePageQueryDTO;
import com.lut.ailab.pojo.entity.People;
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
public class PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    /**
     * 分页查询团队成员
     */
    public Page<People> pageQuery(PeoplePageQueryDTO peoplePageQueryDTO) {
        int pageNum = peoplePageQueryDTO.getPageNum();
        int pageSize = peoplePageQueryDTO.getPageSize();
        String sortField = peoplePageQueryDTO.getSortField();
        String sortDirection = peoplePageQueryDTO.getSortDirection();
        Integer status = peoplePageQueryDTO.getStatus();
        String type = peoplePageQueryDTO.getType();

        Sort.Direction direction = "DESC".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        if (status != null && type != null) {
            return peopleRepository.findByStatusAndTypeOrderBySortOrderAsc(status, type, pageable);
        } else if (status != null) {
            return peopleRepository.findAll(pageable);
        } else {
            return peopleRepository.findAll(pageable);
        }
    }

    /**
     * 获取团队成员列表
     */
    public List<People> getPeopleList(String type) {
        return peopleRepository.findByStatusAndTypeOrderBySortOrderAsc(1, type);
    }

    /**
     * 根据ID获取成员
     */
    public People getById(String id) {
        Optional<People> optional = peopleRepository.findById(id);
        return optional.orElse(null);
    }

    /**
     * 保存成员
     */
    public People save(People people) {
        // 允许更新：如果传入了 id，则基于 id 更新；
        // 如果未传 id 但存在同名同类型记录，则进行“幂等式更新”（覆盖该记录）。

        // 若未提供 id，但 name+type 已存在，则复用其 id 做更新
        if (people.getId() == null && people.getName() != null && people.getType() != null) {
            Optional<People> existingSameKey = peopleRepository.findByNameAndType(people.getName(), people.getType());
            if (existingSameKey.isPresent()) {
                people.setId(existingSameKey.get().getId());
                // 保留原创建时间
                if (people.getCreateTime() == null) {
                    people.setCreateTime(existingSameKey.get().getCreateTime());
                }
            }
        }

        // 若提供了 id，尽量保留已有创建时间
        if (people.getId() != null) {
            Optional<People> existingById = peopleRepository.findById(people.getId());
            if (existingById.isPresent() && people.getCreateTime() == null) {
                people.setCreateTime(existingById.get().getCreateTime());
            }
        }

        if (people.getCreateTime() == null) {
            people.setCreateTime(LocalDateTime.now());
        }
        people.setUpdateTime(LocalDateTime.now());
        return peopleRepository.save(people);
    }

    /**
     * 删除成员
     */
    public void deleteById(String id) {
        peopleRepository.deleteById(id);
    }
}
