package iuh.fit.jwt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Configuration
public class JwtKeyConfig {
    @Value("${jwt.private-key}")
    private String privateKeyStr;

    @Value("${jwt.public-key}")
    private String publicKeyStr;

    @Bean
    public KeyPair keyPair() throws Exception {

        byte[] privateBytes = Base64.getDecoder().decode(privateKeyStr);
        byte[] publicBytes = Base64.getDecoder().decode(publicKeyStr);

        KeyFactory factory = KeyFactory.getInstance("RSA");

        PrivateKey privateKey = factory.generatePrivate(
                new PKCS8EncodedKeySpec(privateBytes));

        PublicKey publicKey = factory.generatePublic(
                new X509EncodedKeySpec(publicBytes));

        return new KeyPair(publicKey, privateKey);
    }
}
