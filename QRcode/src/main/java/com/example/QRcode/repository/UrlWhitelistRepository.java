package com.example.QRcode.repository;

import com.example.QRcode.entity.UrlWhitelist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UrlWhitelistRepository extends MongoRepository<UrlWhitelist,String> {
    Optional<UrlWhitelist> findByUrlW(String urlW);
}
