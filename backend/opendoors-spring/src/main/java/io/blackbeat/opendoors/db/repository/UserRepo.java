package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
