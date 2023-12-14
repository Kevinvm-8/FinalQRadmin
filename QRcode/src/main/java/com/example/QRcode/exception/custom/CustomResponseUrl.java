package com.example.QRcode.exception.custom;


import com.example.QRcode.model.UrlDTOBlack;
import com.example.QRcode.model.UrlDTOScan;
import com.example.QRcode.model.response.AuthenResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor

public class CustomResponseUrl extends ResponseType {
    private AuthenResponse authen;


    @Override
    public String toString() {
        String response = getAuthen() != null ? authen.toString() : null;
        return "CustomResponseUrl{" +
                "code=" + super.getCode() +
                "message=" + super.getMessage() +
                "Token=" + response +

                '}';
    }
}
