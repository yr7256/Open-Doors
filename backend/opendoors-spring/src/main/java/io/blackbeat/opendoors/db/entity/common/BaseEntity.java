package io.blackbeat.opendoors.db.entity.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Getter
@EntityListeners(value = {AuditingEntityListener.class})
@MappedSuperclass
public abstract class BaseEntity extends BaseTimeEntity {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @CreatedBy
    @Column(updatable = false)
    private String createdBy; // 생성자

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @LastModifiedBy
    @Column(updatable = false)
    private String modifiedBy; // 수정자
}
