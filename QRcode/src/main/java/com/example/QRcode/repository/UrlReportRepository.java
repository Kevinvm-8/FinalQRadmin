package com.example.QRcode.repository;


import com.example.QRcode.entity.UrlBlacklist;
import com.example.QRcode.entity.UrlReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UrlReportRepository extends MongoRepository<UrlReport,String> {
    Optional<UrlReport> findByUrlReport(String urlReport);}
