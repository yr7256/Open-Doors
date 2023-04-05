package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
