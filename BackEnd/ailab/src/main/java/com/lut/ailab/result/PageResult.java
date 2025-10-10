package com.lut.ailab.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * 封装分页查询结果
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult implements Serializable {

    private Long total; // 总记录数

    private List rows; // 当前页数据
}
