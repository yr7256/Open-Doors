package io.blackbeat.opendoors.service.impl;


import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.repository.SfInfoRepo;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.SpotSfInfoRepo;
import io.blackbeat.opendoors.service.SpotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SpotServiceImpl implements SpotService {
    private final SpotRepo spotRepo;
    private final SfInfoRepo sfInfoRepo;
    private final SpotSfInfoRepo spotSfInfoRepo;
    @Override
    public Spot saveSpot(Spot spot) {
        log.info("장소 {}를 데이터베이스에 저장합니다." , spot.getSpotName());
        return spotRepo.save(spot);
    }

    @Override
    public SfInfo saveSfInfo(SfInfo sfInfo) {
        log.info("편의 시설 정보 역할 {}을  데이터베이스에 저장합니다." , sfInfo.getSfName());
        return sfInfoRepo.save(sfInfo);
    }

    @Override
    public SpotSfInfo saveSpotSfInfo(SpotSfInfo spotSfInfo) {
        log.info("편의 시설 정보 역할 {}을  데이터베이스에 저장합니다." , spotSfInfo.getSpot());
        return spotSfInfoRepo.save(spotSfInfo);
    }

    @Override
    public List<Spot> getSpotsBySfInfo(Long sfInfoId) {
        log.info("편의 시설 정보 {}번을 가진 장소의 목록을 불러옵니다." , sfInfoId);
        return spotSfInfoRepo.findBySfInfoId(sfInfoId);
    }

    @Override
    public void addSfInfo(String spotName , String sfName) {
        log.info("유저 {}의 역할 {}을 추가하고 데이터베이스에 저장합니다." ,spotName , sfName);
        Spot spot = spotRepo.findBySpotName(spotName);
        SfInfo sfInfo = sfInfoRepo.findBySfName(sfName);
        System.out.println(spot);
        System.out.println(sfInfo);
        SpotSfInfo spotSfInfo = new SpotSfInfo();
        spotSfInfo.setSpot(spot);
        spotSfInfo.setSfInfo(sfInfo);
        spotSfInfoRepo.save(spotSfInfo);
    }

    @Override
    public List<Spot> getSpots() {
        log.info("등록된 장소를 불러옵니다.");
        return spotRepo.findAll();
    }


}
