package iuh.fit.jwt.controller;

import iuh.fit.jwt.dto.LoginRequestDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public AuthController(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody LoginRequestDTO request,
            HttpServletResponse response
    ) {

        if (!"admin".equals(request.getUsername()) ||
                !"123456".equals(request.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        Instant now = Instant.now();


        JwtClaimsSet accessClaims = JwtClaimsSet.builder()
                .subject(request.getUsername())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .claim("type", "access")
                .build();

        String accessToken = jwtEncoder.encode(
                JwtEncoderParameters.from(accessClaims)
        ).getTokenValue();


        JwtClaimsSet refreshClaims = JwtClaimsSet.builder()
                .subject(request.getUsername())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(7 * 24 * 3600))
                .claim("type", "refresh")
                .build();

        String refreshToken = jwtEncoder.encode(
                JwtEncoderParameters.from(refreshClaims)
        ).getTokenValue();

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // demo
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(7 * 24 * 3600);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                Map.of("accessToken", accessToken)
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(
            @CookieValue(value = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {

        if (refreshToken == null) {
            return ResponseEntity.status(401).build();
        }

        Jwt jwt = jwtDecoder.decode(refreshToken);

        if (!"refresh".equals(jwt.getClaim("type"))) {
            return ResponseEntity.status(401).build();
        }

        Instant now = Instant.now();

        JwtClaimsSet newAccessClaims = JwtClaimsSet.builder()
                .subject(jwt.getSubject())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .claim("type", "access")
                .build();

        String newAccessToken = jwtEncoder.encode(
                JwtEncoderParameters.from(newAccessClaims)
        ).getTokenValue();

        // ===== ROTATE REFRESH TOKEN =====
        JwtClaimsSet newRefreshClaims = JwtClaimsSet.builder()
                .subject(jwt.getSubject())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(7 * 24 * 3600))
                .claim("type", "refresh")
                .build();

        String newRefreshToken = jwtEncoder.encode(
                JwtEncoderParameters.from(newRefreshClaims)
        ).getTokenValue();

        Cookie cookie = new Cookie("refreshToken", newRefreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(7 * 24 * 3600);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                Map.of("accessToken", newAccessToken)
        );
    }
}
