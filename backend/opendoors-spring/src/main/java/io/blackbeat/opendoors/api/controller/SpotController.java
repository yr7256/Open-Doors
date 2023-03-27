package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.request.SpotRegistDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.api.response.SpotListDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.Resource.Image;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @GetMapping("/spots")
    public ResponseEntity<List<Spot>>getSpots(){return ResponseEntity.ok().body(spotService.getSpots());}

    @GetMapping("/spots/{sfInfoId}")
    public SpotListDto getSpotsBySfinfo(@PathVariable Long sfInfoId){
        Collection<Spot> spotList  = spotService.getSpotsBySfInfo(sfInfoId);
        return SpotListDto.of("200" , sfInfoId + "를 포함하는 장소의 목록입니다.", spotList , null);
    }

    @PostMapping(value ="/spot/access")
    public CommonDto<Object> accessSpot(@RequestBody SpotRegistDto spotRegistDto){
        Spot spot = spotService.getSpotById(spotRegistDto.getId());
        String rate = spotRegistDto.getRate();
        spot.setSpotRate(rate);
        if(rate.equals("bf") || rate.equals("pf")){
            spot.setState("access");
        }
        else{
            spot.setState("Denied");
        }
        spotService.saveSpot(spot);
        return CommonDto.of("200" , "{}의 장소의 배리어프리 등급이 {}로 설정되었습니다.", spotRegistDto.getId()  + " " +rate);
    }
    @GetMapping("/spot/{id}")
    public CommonDto<Object> getSpotsById(@PathVariable Long id){
        Spot spot  = spotService.getSpotById(id);
        return CommonDto.of("200" , "id", spot);
    }

    @PostMapping(value = "/spot/save")
    public CommonDto<Object> saveSpot(@RequestPart SpotDto spotDto , @RequestPart(value = "spotImages") List<MultipartFile> images) {
        ModelMapper modelMapper = new ModelMapper();
        Spot spot = modelMapper.map(spotDto.getSpot() , Spot.class);
//        List<SpotSfInfo> spotSfInfos = spotDto.get
        List<String> imageLocations = new ArrayList<>();
        List<Image> imageList = new ArrayList<>();
        List<String> results = new ArrayList<>();
        try{
            spotService.saveSpot(spot);
            String postName = spot.getSpotName();
            results = storageService.saveFiles(images, postName);
            for(String result : results){
                imageLocations.add("/"+postName+"/"+result);
                Image img = new Image();
                img.setPathName("/"+postName+"/"+result);
                spot.getImages().add(img);
            }
            for (SfInfo sfInfo: spotDto.getSfInfos()) {
                SpotSfInfo spotSfInfo = new SpotSfInfo();
                spotSfInfo.setSpot(spot);
                spotSfInfo.setSfInfo(sfInfo);
                spotService.saveSpotSfInfo(spotSfInfo);
            }

            return CommonDto.of("200" , "장소등록이 성공적으로 완료되었습니다." , spot.getSpotName());
        }
        catch (Exception e){
            return CommonDto.of("400" , "내용 : " + e.getMessage() ,null);
        }
    }

}
