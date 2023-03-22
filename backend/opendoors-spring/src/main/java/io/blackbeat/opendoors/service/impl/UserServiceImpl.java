package io.blackbeat.opendoors.service.impl;

import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.RoleRepo;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static java.rmi.server.LogStream.log;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private  final UserRepo userRepo;
    private final SfInfoRepo sfInfoRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user ==null){
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        }
        else{
            log.error("User found in the database {}" ,username);

        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername() , user.getPassword() , authorities);
    }

    @Override
    public User saveUser(User user) {
        log.info("유저 {}를 데이터베이스에 저장합니다." , user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("유저의 역할 {}을  데이터베이스에 저장합니다." , role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("유저 {}의 역할 {}을 추가하고 데이터베이스에 저장합니다." ,username , roleName);
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }


    @Override
    public void addSfInfoToUser(Long userId, Collection<Long> sfInfoIds) {
        log.info("유저 {}의 특성 {}을 추가하고 데이터베이스에 저장합니다." ,userId , sfInfoIds);
        User user = userRepo.findById(userId).orElseThrow();
        for(Long sfInfoId : sfInfoIds){
//            Optional<SfInfo> sfInfo = sfInfoRepo.findById(sfInfoId);
            SfInfo sfInfo = sfInfoRepo.findById(sfInfoId).orElseThrow();
            user.getSfInfoIds().add(sfInfo);
        }
        userRepo.save(user);
    }
    @Override
    public User getUser(String username) {
        log.info("유저 {}의 정보를 불러옵니다.." ,username );
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("모든 유저의 정보를 불러옵니다." );
        return userRepo.findAll();
    }


}
