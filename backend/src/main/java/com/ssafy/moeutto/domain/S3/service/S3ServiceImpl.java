package com.ssafy.moeutto.domain.S3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.moeutto.domain.S3.dto.response.S3ResponseDto;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.jwt.JwtTokenProvider;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service{

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3Client amazonS3Client;
//    private final JwtTokenProvider jwtTokenProvider;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * S3 에 이미지 업로드 후, S3ResponseDto 반환 ( accessURL 등등 들어있음 )
     * @param token
     * @param file
     * @return
     * @throws BaseException
     */
    @Override
    // 독립성이나 원자성 문제 발생시 @Transactional 사용
    public S3ResponseDto uploadImage(String token, MultipartFile file) throws BaseException, IOException {
        String originalName = file.getOriginalFilename();
        S3ResponseDto responseDto = new S3ResponseDto(originalName);
        String filename = responseDto.getStoredName();

        String folderName = authTokensGenerator.extractMemberId(token).toString();
        System.out.println("S3 upload folderName : "+ folderName);

        folderName = folderName + "/" + filename;
        System.out.println("S3 upload folderName + fileName : "+ folderName);

        InputStream inputStream = file.getInputStream();

        try {
            /*
             * ObjectMetadata는 MultipartFile에서 제공하는 getInputStream() 메소드같은 것이 없어서
             * 객체를 생성하여 매개변수로 전달해주어야함
             * ObjectMetadata는 InputStream에 저장도니 파일의 정보, 즉 MultipartFile의 정보이기 때문에
             * 파일의 형식이 어떤지, 길이가 어느정도 되는지 정보 입력해야함
             * */
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(inputStream.available());

//            amazonS3Client.putObject(bucketName, filename, file.getInputStream(), objectMetadata);
            amazonS3Client.putObject(bucketName, folderName, file.getInputStream(), objectMetadata);


            // 이미지 접근 URL의 경우, amazonS3Client.getUrl() 메소드를 통해 이미지 접근 URL 얻음
//            String accessUrl = amazonS3Client.getUrl(bucketName, filename).toString();
            String accessUrl = amazonS3Client.getUrl(bucketName, folderName).toString();

            responseDto.setAccessUrl(accessUrl);
        } catch(IOException e) {
            throw new BaseException(BaseResponseStatus.S3_FILE_IO_ERROR);
        } finally {
            try {
                inputStream.close();
            } catch (IOException e) {
                throw new BaseException(BaseResponseStatus.S3_FILE_IO_ERROR);
            }
        }

        return responseDto;
    }

    /**
     * UUID로 폴더 생성
     * @param folderName
     * @throws BaseException
     */
    @Override
    public void createFolder(String folderName) throws BaseException {

        amazonS3Client.putObject(bucketName, folderName + "/",new ByteArrayInputStream(new byte[0]),new ObjectMetadata());
        
    }


}
