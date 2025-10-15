package com.lut.ailab.pojo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticesPageQueryDTO implements Serializable {

    private Integer pageNum = 0; // 默认值 0

    private Integer pageSize = 10; // 默认值 10

    private String sortField = "noticeTime";

    private String sortDirection = "DESC";
    
    private Integer status = 1; // 默认查询已发布
}






