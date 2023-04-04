package io.blackbeat.opendoors.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.blackbeat.opendoors.db.entity.common.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PointRecord extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String username;
    private String source;
    private Integer pointChange;
}
