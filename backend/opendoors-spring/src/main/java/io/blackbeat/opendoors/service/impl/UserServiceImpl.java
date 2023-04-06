package io.blackbeat.opendoors.service.impl;

import io.blackbeat.opendoors.api.request.LoginDto;
import io.blackbeat.opendoors.api.response.TokenDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Point;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.PointRepo;
import io.blackbeat.opendoors.db.repository.RoleRepo;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.JwtService;
import io.blackbeat.opendoors.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final SfInfoRepo sfInfoRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PointRepo pointRepo;


//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepo.findByUsername(username);
//        if(user ==null){
//            log.error("User not found in the database");
//            throw new UsernameNotFoundException("User not found in the database");
//        }
//        else{
//            log.error("User found in the database {}" ,username);
//
//        }
//        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        user.getRoles().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority(role.getName()));
//        });
//        return new org.springframework.security.core.userdetails.User(user.getUsername() , user.getPassword() , authorities);
//    }

    @Override
    public TokenDto login(LoginDto loginDto) {
        User user = userRepo.findByUsername(loginDto.getUsername());
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                )
        );

        String token = jwtService.generateToken(user);
        return new TokenDto(token);
    }

    @Override
    public User saveUser(User user) {
        log.info("유저 {}를 데이터베이스에 저장합니다.", user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Point point = Point.builder()
                .username(user.getUsername())
                .totalPoint(0)
                .pointRecords(new ArrayList<>())
                .build();
        pointRepo.save(point);
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("유저의 역할 {}을  데이터베이스에 저장합니다.", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("유저 {}의 역할 {}을 추가하고 데이터베이스에 저장합니다.", username, roleName);
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }


    @Override
    public void addSfInfoToUser(Long userId, Collection<Long> sfInfoIds) {
        log.info("유저 {}의 특성 {}을 추가하고 데이터베이스에 저장합니다.", userId, sfInfoIds);
        User user = userRepo.findById(userId).orElseThrow();
        for (Long sfInfoId : sfInfoIds) {
//            Optional<SfInfo> sfInfo = sfInfoRepo.findById(sfInfoId);
            SfInfo sfInfo = sfInfoRepo.findById(sfInfoId).orElseThrow();
            user.getSfInfoIds().add(sfInfo);
        }
        userRepo.save(user);
    }

    @Override
    public User getUser(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        return user;
    }

    @Override
    public List<User> getUsers() {
        log.info("모든 유저의 정보를 불러옵니다.");
        return userRepo.findAll();
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public void changePassword(String username, String beforePassword, String newPassword) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        if (!passwordEncoder.matches(beforePassword, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @Override
    public void changePreference(String username, List<Long> sfInfoIds) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        List<SfInfo> changeSfInfoIds = new ArrayList<>();
        for (Long sfInfoId : sfInfoIds) {
            SfInfo sfInfo = sfInfoRepo.findById(sfInfoId).orElseThrow();
            changeSfInfoIds.add(sfInfo);
        }

        user.setSfInfoIds(changeSfInfoIds);
        userRepo.save(user);
    }

    @Override
    public void deleteUser(String username, String password) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        userRepo.delete(user);
    }
}
