package com.lut.ailab.pojo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "people")
@CompoundIndex(def = "{'name': 1, 'type': 1}", unique = true)
public class People implements Serializable {
    // 人员id
    @Id
    private String id;

    // 姓名
    private String name;

    // 职位/职称
    private String title;

    // 研究方向
    private String researchDirection;

    // 个人简介
    private String bio;

    // 头像图片路径
    private String avatarUrl;

    // 个人主页链接
    private String personalHomepage;

    // 人员类型：teacher / student / committee
    private String type;

    // 排序权重
    private Integer sortOrder;

    // 状态：0-隐藏，1-显示
    private Integer status;

    // 创建时间
    private LocalDateTime createTime;

    // 更新时间
    private LocalDateTime updateTime;
}
