package soloco.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.Data;

@Entity
@Data
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private String image;

    @Column(name = "likes_count")
    private int likesCount;

    @Column(name = "favorites_count")
    private int favoritesCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }    

    protected void onDelete() {
        this.deletedAt = LocalDateTime.now();
    }
}
