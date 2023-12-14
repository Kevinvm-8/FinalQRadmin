package com.example.QRcode.model.Mapper;

import com.example.QRcode.entity.Authen;
import com.example.QRcode.model.response.AuthenResponse;

public class AuthenMapper {
    public static AuthenResponse toAuthenResponse(Authen authen){
        return AuthenResponse.builder().Token(authen.getAccessToken()).build();
    }
}
