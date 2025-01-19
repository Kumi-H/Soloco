package soloco.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.Data;

@Entity
@Data
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int price;

    @Column(name = "coupon_discount_rate", nullable = false)
    private int couponDiscountRate;

    @Column(name = "image_thumbnail", nullable = false)
    private String imageThumbnail;

    @Column(name = "image_small", nullable = false)
    private String imageSmall;

    @Column(name = "image_large", nullable = false)
    private String image_large;

    @Column(name = "time_zone", nullable = false)
    private String timeZone;

    @Column(name = "solo_level", nullable = false)
    private String soloLevel;

    @Column(name = "likes_count")
    private int likesCount;

    @Column(name = "favorites_count")
    private int favoritesCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private Provider provider;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "activity_category_id")
    // private ActivityCategory activityCategory;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "activity_subcategory_id")
    // private ActivitySubcategory activitySubcategory;

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
