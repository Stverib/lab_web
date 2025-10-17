package com.lut.ailab.pojo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeoplePageQueryDTO implements Serializable {

    private Integer pageNum = 0; // 默认值 0

    private Integer pageSize = 10; // 默认值 10

    private String sortField = "sortOrder";

    private String sortDirection = "ASC";
    
    private Integer status = 1; // 默认查询显示
    
    private String type; // 人员类型：teacher-教师，student-学生，committee-学术委员会
}
