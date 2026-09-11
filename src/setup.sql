
CREATE TABLE IF NOT EXISTS public.organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    contact_email VARCHAR(150),
    logo_filename VARCHAR(150)
);


-- =========================================
-- 2. PROJECT TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS public.project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT project_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES public.organization (organization_id)
        ON DELETE CASCADE
);


-- =========================================
-- 3. CATEGORY TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- =========================================
-- 4. PROJECT CATEGORY TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT project_category_project_fk
        FOREIGN KEY (project_id)
        REFERENCES public.project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT project_category_category_fk
        FOREIGN KEY (category_id)
        REFERENCES public.category (category_id)
        ON DELETE CASCADE
);


-- =========================================
-- ORGANIZATION DATA
-- =========================================

INSERT INTO public.organization
    (organization_id, name, description, contact_email, logo_filename)
VALUES
    (1, 'BrightFuture Builders',
     'A nonprofit focused on improving community infrastructure through sustainable construction.',
     'contact@brightfuture.org',
     'brightfuture.jpg'),

    (2, 'GreenHarvest Growers',
     'An urban farming collective promoting food sustainability and education in local neighborhoods.',
     'contact@greenharvest.org',
     'greenharvest.jpg'),

    (3, 'UnityServe Volunteers',
     'A volunteer coordination group supporting local charities and service initiatives.',
     'contact@unityserve.org',
     'unityserve.jpg')
ON CONFLICT (organization_id) DO NOTHING;


-- =========================================
-- PROJECT DATA
-- =========================================

INSERT INTO public.project
    (organization_id, title, description, location, date)
VALUES

-- BrightFuture Builders
(1, 'Community Park Cleanup',
 'Volunteers will clean and improve the local community park.',
 'Lagos Community Park',
 '2026-10-05'),

(1, 'Youth Education Workshop',
 'A workshop providing educational support and learning resources for young people.',
 'BrightFuture Community Center',
 '2026-10-12'),

(1, 'Community Health Awareness',
 'A community event focused on health education and wellness awareness.',
 'Lagos Community Hall',
 '2026-10-19'),

(1, 'Neighborhood Food Drive',
 'Volunteers will collect and distribute food to families in need.',
 'BrightFuture Community Center',
 '2026-10-26'),

(1, 'Tree Planting Project',
 'Volunteers will plant trees to improve the local environment.',
 'Lagos Green Park',
 '2026-11-02'),

-- GreenHarvest Growers
(2, 'Community Garden Project',
 'Volunteers will help create and maintain a community vegetable garden.',
 'GreenHarvest Community Garden',
 '2026-10-07'),

(2, 'Sustainable Farming Workshop',
 'Participants will learn environmentally friendly farming practices.',
 'GreenHarvest Training Center',
 '2026-10-14'),

(2, 'Food Donation Program',
 'Fresh produce will be collected and distributed to families in need.',
 'GreenHarvest Farm',
 '2026-10-21'),

(2, 'Tree Planting Day',
 'Volunteers will plant trees around the community to support the environment.',
 'GreenHarvest Farm',
 '2026-10-28'),

(2, 'Youth Farming Training',
 'Young people will learn basic farming and food production skills.',
 'GreenHarvest Training Center',
 '2026-11-04'),

-- UnityServe Volunteers
(3, 'Neighborhood Cleanup',
 'Volunteers will clean streets and public areas in the local community.',
 'UnityServe Community Area',
 '2026-10-09'),

(3, 'Elderly Support Program',
 'Volunteers will provide assistance and companionship to elderly community members.',
 'UnityServe Community Center',
 '2026-10-16'),

(3, 'Clothing Donation Drive',
 'Volunteers will collect and distribute clothing to people who need assistance.',
 'UnityServe Community Hall',
 '2026-10-23'),

(3, 'School Supply Drive',
 'Volunteers will collect school supplies for children in underserved communities.',
 'UnityServe Community Center',
 '2026-10-30'),

(3, 'Community Volunteer Day',
 'A volunteer event bringing community members together to support local initiatives.',
 'UnityServe Community Hall',
 '2026-11-06');


-- =========================================
-- CATEGORY DATA
-- =========================================

INSERT INTO public.category
    (category_id, name)
VALUES
    (1, 'Environmental'),
    (2, 'Education'),
    (3, 'Community Service'),
    (4, 'Health and Wellness')
ON CONFLICT (category_id) DO NOTHING;


-- =========================================
-- PROJECT CATEGORY RELATIONSHIPS
-- =========================================

INSERT INTO public.project_category
    (project_id, category_id)
VALUES
    -- Project 1
    (1, 1),
    (1, 3),

    -- Project 2
    (2, 2),
    (2, 3),

    -- Project 3
    (3, 4),
    (3, 3),

    -- Project 4
    (4, 3),

    -- Project 5
    (5, 1),
    (5, 3),

    -- Project 6
    (6, 1),
    (6, 3),

    -- Project 7
    (7, 1),
    (7, 2),

    -- Project 8
    (8, 3),

    -- Project 9
    (9, 1),

    -- Project 10
    (10, 1),
    (10, 2),

    -- Project 11
    (11, 1),
    (11, 3),

    -- Project 12
    (12, 4),
    (12, 3),

    -- Project 13
    (13, 3),

    -- Project 14
    (14, 2),
    (14, 3),

    -- Project 15
    (15, 3)
ON CONFLICT (project_id, category_id) DO NOTHING;