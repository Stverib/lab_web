package com.lut.ailab.pojo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "academic_committee")
public class AcademicCommittee implements Serializable {

    @Id
    private String id;

    @Indexed
    private String name;

    private String gender;

    private String title;

    private String organization;

    private String academicPosition;

    private String honor;

    private String avatarUrl;

    private Integer sortOrder;

    private Integer status; // 1=显示，0=隐藏

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}





