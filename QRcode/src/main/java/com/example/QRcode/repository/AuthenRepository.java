package com.example.QRcode.repository;

import com.example.QRcode.entity.Authen;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AuthenRepository extends MongoRepository<Authen,String> { }
