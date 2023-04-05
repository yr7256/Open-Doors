package io.blackbeat.opendoors;

import io.blackbeat.opendoors.config.FileStorageProperties;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class OpendoorsApplication {

    public static void main(String[] args) {
        SpringApplication.run(OpendoorsApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserService userService, SpotService spotService) {
        return agrs -> {
            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_MANAGER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));
            userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            spotService.saveSfInfo(new SfInfo(null, "WheelChair"));
            spotService.saveSfInfo(new SfInfo(null, "Guide Dog"));
            spotService.saveSfInfo(new SfInfo(null, "WheelChair Elevator"));
            spotService.saveSfInfo(new SfInfo(null, "Free Parking"));
            spotService.saveSfInfo(new SfInfo(null, "Disabled Toilet"));
            spotService.saveSfInfo(new SfInfo(null, "Elevator"));
            spotService.saveSfInfo(new SfInfo(null, "Several people"));
            spotService.saveSfInfo(new SfInfo(null, "First Floor"));
        };
    }
}
