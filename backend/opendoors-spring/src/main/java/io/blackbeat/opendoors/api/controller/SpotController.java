package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.RegistDto;
import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.api.response.SpotListDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.service.SpotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class SpotController {
    private final SpotService spotService;

    @GetMapping("/spots")
    public ResponseEntity<List<Spot>>getSpots(){return ResponseEntity.ok().body(spotService.getSpots());}

    @GetMapping("/spots/{sfInfoId}")
    public SpotListDto getSpotsBySfinfo(@PathVariable Long sfInfoId){
        Collection<Spot> spotList  = spotService.getSpotsBySfInfo(sfInfoId);
        return SpotListDto.of("200" , sfInfoId + "를 포함하는 장소의 목록입니다.", spotList);
    }

    @PostMapping("/spot/save")
    public CommonDto<Object> saveSpot(@RequestBody SpotDto spotDto) {
        ModelMapper modelMapper = new ModelMapper();
        Spot spot = modelMapper.map(spotDto.getSpot() , Spot.class);
//        List<SpotSfInfo> spotSfInfos = spotDto.get

        try{
            spotService.saveSpot(spot);
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
