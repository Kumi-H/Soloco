CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    nickname VARCHAR(100) NOT NULL UNIQUE,
    age VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE solo_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE solo_type_diagnostic_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    solo_level VARCHAR(50),
    activity_preference VARCHAR(50),
    time_preference VARCHAR(50),
    is_planned BOOLEAN,
    weekend_plan_preference BOOLEAN,
    after_work_preference VARCHAR(50),
    comfort_adventure VARCHAR(50),
    solo_type_id INTEGER REFERENCES solo_types(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    text text NOT NULL,
    image VARCHAR(255) NOT NULL,
    likes_count INTEGER DEFAULT 0,
    favorites_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number INTEGER NOT NULL,
    address VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    business_hours VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE activity_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE activity_subcategories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    activity_category_id INTEGER REFERENCES activity_categories(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description text NOT NULL,
    price INTEGER NOT NULL,
    coupon_discount_rate INTEGER DEFAULT 0,
    image_thumbnail VARCHAR(255),
    image_small VARCHAR(255),
    image_large VARCHAR(255),
    time_zone VARCHAR(50) NOT NULL,
    solo_level VARCHAR(50) NOT NULL,
    likes_count INTEGER DEFAULT 0,
    favorites_count INTEGER DEFAULT 0,
    provider_id INTEGER NOT NULL REFERENCES providers(id),
    activity_category_id INTEGER NOT NULL REFERENCES activity_categories(id), 
    activity_subcategory_id INTEGER NOT NULL REFERENCES activity_subcategories(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);