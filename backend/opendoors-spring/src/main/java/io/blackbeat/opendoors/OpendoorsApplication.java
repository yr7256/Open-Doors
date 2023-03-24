package io.blackbeat.opendoors;

import io.blackbeat.opendoors.db.entity.Place.Menu;
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

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Collection;

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
			spotService.saveSfInfo(new SfInfo(null , "Free Parking"));
			spotService.saveSfInfo(new SfInfo(null , "Disabled Toilet" ));
			spotService.saveSfInfo(new SfInfo(null , "Elevator" ));
			spotService.saveSfInfo(new SfInfo(null , "Several people"));
			spotService.saveSfInfo(new SfInfo(null , "First Floor" ));

			Spot test = new Spot();
			test.setSpotAddress("대전광역시 서구 도마3길 46");
			test.setSpotAveragePoint(3);
			test.setSpotLat(36.396659269055);
			test.setSpotLng(127.40273836514);
			test.setZipcode(34052);
			test.setSpotBuildingName("test빌딩");
			test.setSpotAveragePoint(3);
			test.setSpotTelNumber("0507-1387-8680");
			test.setSpotName("카페 B 307308");
			test.setSpotRate("bf");
			test.setReviewScore(4.49);
			test.setReviewCount(244);
			Menu menu = new Menu();
			menu.setPrice(1500);
			menu.setTitle("아메리카노");
			test.getMenus().add(menu);
			spotService.addMenu(menu , 1L);
			menu = new Menu();
			menu.setPrice(2000);
			menu.setTitle("콜드브루");
			test.getMenus().add(menu);
			spotService.addMenu(menu , 1L);
			spotService.saveSpot(test);
			spotService.addSfInfo("카페 B 307308"  , "WheelChair");
		};
	}
}
