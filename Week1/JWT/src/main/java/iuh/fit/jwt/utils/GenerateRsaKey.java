package iuh.fit.jwt.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class GenerateRsaKey {

    public static void gen() throws NoSuchAlgorithmException {
        KeyPairGenerator gen = KeyPairGenerator.getInstance("RSA");
        gen.initialize(2048);

        KeyPair keyPair = gen.generateKeyPair();

        String privateKey = Base64.getEncoder()
                .encodeToString(keyPair.getPrivate().getEncoded());

        String publicKey = Base64.getEncoder()
                .encodeToString(keyPair.getPublic().getEncoded());

        System.out.println("PRIVATE KEY:");
        System.out.println(privateKey);
        System.out.println("\nPUBLIC KEY:");
        System.out.println(publicKey);
    }
}
