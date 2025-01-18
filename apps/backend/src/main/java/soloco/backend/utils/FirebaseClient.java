package soloco.backend.utils;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseClient {
    Logger logger = LoggerFactory.getLogger(FirebaseClient.class);

    @PostConstruct
    public void initializeFirebase() {
        
        try (InputStream serviceAccount = new ClassPathResource("config/credential.json").getInputStream()) {
            
            if (serviceAccount == null) {
                throw new IllegalArgumentException("Firebase credential file not found.");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

        } catch (IOException | IllegalArgumentException e) {
            logger.error("error: ", e);
        }
    }
}
