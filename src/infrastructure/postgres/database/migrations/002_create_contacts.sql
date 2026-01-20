CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    contact_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_contacts_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    CONSTRAINT fk_contacts_contact
        FOREIGN KEY (contact_user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    CONSTRAINT unique_contact UNIQUE (user_id, contact_user_id)
);