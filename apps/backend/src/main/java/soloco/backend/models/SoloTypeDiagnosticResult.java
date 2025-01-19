package soloco.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;
import soloco.backend.utils.analysis.soloType;

@Entity
@Data
@Table(name = "solo_type_diagnostic_results")
public class SoloTypeDiagnosticResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "solo_level")
    private String soloLevel;

    @Column(name = "activity_preference")
    private String activityPreference;

    @Column(name = "is_planned")
    private String isPlanned;

    @Column(name = "time_preference")
    private boolean timePreference;

    @Column(name = "weekend_plan_preference")
    private boolean weekendPlanPreference;

    @Column(name = "after_work_preference")
    private String afterWorkPreference;

    @Column(name = "comfort_adventure")
    private String comfortAdventure;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solo_type_id", nullable = false)
    private soloType soloType;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    } 
}
