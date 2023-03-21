package io.blackbeat.opendoors;

import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class OpendoorsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpendoorsApplication.class, args);
	}
	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	@Bean
	CommandLineRunner run(UserService userService, SpotService spotService){
		return agrs -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_MANAGER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

			spotService.saveSfInfo(new SfInfo(null , "WheelChair" ));
			spotService.saveSfInfo(new SfInfo(null , "Guide Dog" ));
			spotService.saveSfInfo(new SfInfo(null , "WheelChair Elevator" ));
			spotService.saveSfInfo(new SfInfo(null , "Electric Wheelchair Charging Station"));
			spotService.saveSfInfo(new SfInfo(null , "Disabled Toilet" ));
			spotService.saveSfInfo(new SfInfo(null , "Elevator" ));
			spotService.saveSfInfo(new SfInfo(null , "Several people"));
			spotService.saveSfInfo(new SfInfo(null , "First Floor" ));

			userService.saveUser(new User(null, "John Travolta", "john", "1234","man", false, new ArrayList<>()));
			userService.saveUser(new User(null, "Will Smith", "will", "1234", "man", false, new ArrayList<>()));
			userService.saveUser(new User(null, "Jim Carry", "jim", "1234", "man", false, new ArrayList<>()));
			userService.saveUser(new User(null, "Arnold Schwarzenegger", "arnold", "1234", "man", false, new ArrayList<>()));

			userService.addRoleToUser("john", "ROLE_USER");
			userService.addRoleToUser("john", "ROLE_MANAGER");
			userService.addRoleToUser("will", "ROLE_MANAGER");
			userService.addRoleToUser("jim", "ROLE_ADMIN");
			userService.addRoleToUser("arnold", "ROLE_SUPER_ADMIN");
			userService.addRoleToUser("arnold", "ROLE_ADMIN");
			userService.addRoleToUser("arnold", "ROLE_USER");

			Spot test = new Spot();
			test.setSpotAddress("test");
			test.setSpotAveragePoint(3);
			test.setSpotLat(2.3);
			test.setSpotLng(2.3);
			test.setSpotBuildingName("test빌딩");
			test.setSpotAveragePoint(3);
			test.setSpotTelNumber("33232323");
			test.setSpotName("test매장");
			spotService.saveSpot(test);
			spotService.addSfInfo("test매장"  , "WheelChair");

		};
	}
}
