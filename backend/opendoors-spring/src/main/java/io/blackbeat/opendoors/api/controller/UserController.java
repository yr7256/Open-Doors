package io.blackbeat.opendoors.api.controller;


import io.blackbeat.opendoors.api.request.LoginDto;
import io.blackbeat.opendoors.api.request.PointDto;
import io.blackbeat.opendoors.api.request.RegistDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.api.response.TokenDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.JwtService;
import io.blackbeat.opendoors.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepo userRepo;
    private final SpotRepo spotRepo;
    private final SfInfoRepo sfInfoRepo;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user/access/list/{username}")
    public CommonDto<Object> getRegistedSpotList(@PathVariable String username) {
        List<Spot> spotList = spotRepo.findAllByUsername(username);
        return null;
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
        System.out.println(registDto);
        ModelMapper modelMapper = new ModelMapper();
        User user = modelMapper.map(registDto.getUser(), User.class);
        user.setRoles(new ArrayList<>());
        System.out.println(user);
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

//    @GetMapping("/token/refresh")
//    public void addRoleToUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        String authorizationHeader = request.getHeader(AUTHORIZATION);
//        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
//            try {
//                String refresh_token = authorizationHeader.substring("Bearer ".length());
//                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
//                JWTVerifier verifier = JWT.require(algorithm).build();
//                DecodedJWT decodedJWT = verifier.verify(refresh_token);
//                String username = decodedJWT.getSubject();
//                User user = userService.getUser(username);
//                String access_token = JWT.create()
//                        .withSubject(user.getUsername())
//                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
//                        .withIssuer(request.getRequestURL().toString())
//                        .withClaim("roles" , user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
//                        .sign(algorithm);
//                Map<String, String> tokens = new HashMap<>();
//                tokens.put("access_token",access_token);
//                tokens.put("refresh_token",refresh_token);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream() , tokens);
//            }catch (Exception e){
//                log.error("Error logging in : {}" , e.getMessage());
//                response.setHeader("error" , e.getMessage());
//                response.setStatus(FORBIDDEN.value());
//                Map<String , String> error = new HashMap<>();
//                error.put("error_messege" , e.getMessage());
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream() , error);
//            }
//        }
//        else{
//            throw new RuntimeException("the token is missing");
//        }
//    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
