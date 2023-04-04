package io.blackbeat.opendoors.db.entity.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@EntityListeners(value = {AuditingEntityListener.class})
@MappedSuperclass
public abstract class BaseTimeEntity {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // 생성 시간
}
