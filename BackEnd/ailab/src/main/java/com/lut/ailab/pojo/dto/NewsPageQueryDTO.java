package com.lut.ailab.pojo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsPageQueryDTO implements Serializable {

    private String userId;

    private Integer pageNum = 0; // 默认值 0

    private Integer pageSize = 9; // 默认值 10

    private String sortField = "createTime";

    private String sortDirection = "DESC";
}
