package io.blackbeat.opendoors.api.controller;


import io.blackbeat.opendoors.api.request.*;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.api.response.TokenDto;
import io.blackbeat.opendoors.db.entity.DisLike;
import io.blackbeat.opendoors.db.entity.LikeSpot;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.JwtService;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final SpotService spotService;
    private final JwtService jwtService;
    private final UserRepo userRepo;
    private final SpotRepo spotRepo;
    private final SfInfoRepo sfInfoRepo;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal String username) {
        return ResponseEntity.ok().body(userRepo.findByUsername(username));
    }

    @GetMapping("/user/access/list/{username}")
    public CommonDto<Object> getRegistedSpotList(@PathVariable String username) {
        List<Spot> spotList = spotRepo.findAllByUsername(username);
        return CommonDto.of("200", username + "님이 획득한 포인트 입니다..", spotList);
    }

    @PostMapping("/user/like")
    public CommonDto<Object> likeDisLikeSpot(@RequestBody LikeDisLikeDto likeDisLikeDto) {
        User user = userService.getUser(likeDisLikeDto.getUsername());
        if (likeDisLikeDto.getIsLikeOrDisLike() == 1) {
            LikeSpot likeSpot = new LikeSpot();
            likeSpot.setSpotId(likeDisLikeDto.getSpotId());
            likeSpot.setUsername(likeSpot.getUsername());
            user.getLikeSpot().add(likeSpot);
        } else {
            DisLike dislikeSpot = new DisLike();
            dislikeSpot.setSpotId(likeDisLikeDto.getSpotId());
            dislikeSpot.setUsername(dislikeSpot.getUsername());
            user.getDisLikeSpot().add(dislikeSpot);
        }
        userRepo.save(user);
        return CommonDto.of("200", "좋아요 싫어요 정보가 저장되었습니다.", likeDisLikeDto.getUsername());
    }

    @GetMapping("/user/point/{username}")
    public CommonDto<Object> getPoints(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        return CommonDto.of("200", username + "님이 획득한 포인트 입니다..", user.getPoint());
    }

    @PutMapping("/user/point")
    public CommonDto<Object> setPoints(@RequestBody PointDto pointDto) {
        User user = userRepo.findByUsername(pointDto.getUsername());
        user.setPoint(pointDto.getPoint() + user.getPoint());
        userRepo.save(user);
        return CommonDto.of("200", user.getUsername() + "님이 획득한 포인트 입니다..", user.getUsername());
    }

    @PostMapping("/user/save")
    public CommonDto<Object> saveUser(@RequestBody RegistDto registDto) {
        if (userRepo.existsByUsername(registDto.getUser().getUsername())) {
            throw new IllegalArgumentException("이미 가입된 아이디입니다.");
        }

        ModelMapper modelMapper = new ModelMapper();
        User user = modelMapper.map(registDto.getUser(), User.class);
        user.setRoles(new ArrayList<>());
        try {
            for (Long sfInfoId : registDto.getSfInfoIds()) {
                SfInfo sfInfo = sfInfoRepo.findById(sfInfoId).orElseThrow();
                user.getSfInfoIds().add(sfInfo);
            }
            userService.saveUser(user);
            userService.addRoleToUser(user.getUsername(), "ROLE_USER");
            return CommonDto.of("200", "회원가입이 성공적으로 완료되었습니다.", user.getName());
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @PostMapping("role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm from) {
        userService.addRoleToUser(from.getUsername(), from.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/login")
    public ResponseEntity<TokenDto> authenticate(@RequestBody LoginDto loginDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(loginDto));
    }

    @GetMapping("/user/duplicate")
    public ResponseEntity<Boolean> isDuplicated(@RequestParam(value = "id") String username) {
        return ResponseEntity.ok(userService.existsByUsername(username));
    }

    @PutMapping("/user/change/password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal String username, @RequestBody ChangePasswordDto changePasswordDto) {
        userService.changePassword(username, changePasswordDto.getBeforePassword(), changePasswordDto.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/change/preference")
    public ResponseEntity<?> changePreference(@AuthenticationPrincipal String username, @RequestBody Map<String, List<Long>> request) {
        userService.changePreference(username, request.get("sfInfoIds"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal String username, @RequestBody Map<String, String> requests) {
        userService.deleteUser(username, requests.get("password"));
        return ResponseEntity.ok().build();
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
