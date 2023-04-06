package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.request.SpotRegistDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.api.response.SpotListDto;
import io.blackbeat.opendoors.api.response.SpotSearchDto;
import io.blackbeat.opendoors.api.response.SpotsDto;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.Point;
import io.blackbeat.opendoors.db.entity.PointRecord;
import io.blackbeat.opendoors.db.entity.Resource.Image;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.PointRecordRepo;
import io.blackbeat.opendoors.db.repository.PointRepo;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.StorageService;
import io.blackbeat.opendoors.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class SpotController {
    private final SpotService spotService;
    private final StorageService storageService;
    private final UserService userService;
    private final SfInfoRepo sfInfoRepo;
    private final PointRepo pointRepo;
    private final PointRecordRepo pointRecordRepo;

    @GetMapping("/spots/mylocation/{username}")
    public SpotSearchDto myLocation(@PathVariable String username){
        List<Spot> spotList = spotService.getSpotsByUsername(username);
        return SpotSearchDto.of("200", username +  "가 등록한 모든 장소의 목록입니다.", spotList);
    }

    @GetMapping("/spots/search/{title}")
    public SpotSearchDto getSpotsContaintTitle(@PathVariable String title) {
        List<Spot> spotList = spotService.getSpotsByTitle(title);
        return SpotSearchDto.of("200", "모든 장소의 목록입니다.", spotList);
    }

    @GetMapping("/spots")
    public SpotsDto getSpots() {
        List<Spot> spotList = spotService.getSpots();
//        List<Resource> imglist = new ArrayList<>();
//        for(Spot spot : spotList){
//            List<Resource> temp = new ArrayList<>();
//            for( Image image:  spot.getImages()){
//                System.out.println(storageService.loadFileAsResource(String.valueOf(spot.getId()) , image.getPathName()));
//            }
//        }
        return SpotsDto.of("200", "모든 장소의 목록입니다.", spotList, null);
    }

    @GetMapping("/spot/image/{spotId}/{pathName}")
    public ResponseEntity<Resource> getSpotImage(@PathVariable String spotId, @PathVariable String pathName, HttpServletRequest request) {
        Resource resource = storageService.loadFileAsResource(String.valueOf(spotId), pathName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/spots/{sfInfoId}")
    public SpotListDto getSpotsBySfinfo(@PathVariable Long sfInfoId) {
        Collection<Spot> spotList = spotService.getSpotsBySfInfo(sfInfoId);
        return SpotListDto.of("200", sfInfoId + "를 포함하는 장소의 목록입니다.", spotList, null);
    }

    @PostMapping(value = "/spot/access")
    public CommonDto<Object> accessSpot(@RequestBody SpotRegistDto spotRegistDto) {
        Spot spot = spotService.getSpotById(spotRegistDto.getId());
        String rate = spotRegistDto.getRate();
        spot.setSpotRate(rate);
        if (rate.equals("bf") || rate.equals("pf")) {
            spot.setState("access");
            // 포인트 적립
            Point point = pointRepo.findByUsername(spot.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
            point.increasePoint(100);
            pointRepo.save(point);
            // 포인트 적립 기록 저장
            PointRecord pointRecord = PointRecord.builder()
                    .username(spot.getUsername())
                    .source("배리어프리 장소 등록")
                    .pointChange(100)
                    .build();
            pointRecordRepo.save(pointRecord);
        } else {
            spot.setState("Denied");
        }
        spotService.saveSpot(spot);
        User user = userService.getUser(spotRegistDto.getUsername());
        user.setPoint(user.getPoint() + 100);
        return CommonDto.of("200", "{}의 장소의 배리어프리 등급이 {}로 설정되었습니다.", spotRegistDto.getId() + " " + rate);
    }

    @GetMapping("/spot/{id}")
    public CommonDto<Object> getSpotsById(@PathVariable Long id) {
        Spot spot = spotService.getSpotById(id);
        return CommonDto.of("200", "id", spot);
    }

    @PostMapping(value = "/spot/save")
    public CommonDto<Object> saveSpot(@RequestPart SpotDto spotDto, @RequestPart(value = "spotImages", required = false) List<MultipartFile> images) {
        ModelMapper modelMapper = new ModelMapper();
        Spot spot = modelMapper.map(spotDto.getSpot(), Spot.class);
        if (spot.getState() == null || spot.getState().equals("")) {
            spot.setState("ready");
        }
        List<String> imageLocations = new ArrayList<>();
        try {
            spotService.saveSpot(spot);
            String postName = String.valueOf(spot.getId());
            List<String> results = storageService.saveFiles(images, postName);
            for (String result : results) {
//                imageLocations.add("/" + postName + "/" + result);
                imageLocations.add(result);
                Image img = new Image();
//                img.setPathName("/" + postName + "/" + result);
                img.setPathName(result);
                spot.getImages().add(img);
            }
            System.out.println(spotDto.getSfInfos().toString());
            for (Long sfInfoId : spotDto.getSfInfos()) {
                SpotSfInfo spotSfInfo = new SpotSfInfo();
                spotSfInfo.setSpot(spot);
                spotSfInfo.setSfInfo(sfInfoRepo.findById(sfInfoId).orElseThrow());
                spotService.saveSpotSfInfo(spotSfInfo);
            }
            return CommonDto.of("200", "장소등록이 성공적으로 완료되었습니다.", spot.getSpotName());
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @DeleteMapping("/spot/{id}")
    public ResponseEntity<?> deleteSpot(@PathVariable Long id) {
        spotService.deleteSpot(id);
        return ResponseEntity.ok().build();
    }
}
