CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    deck_id UUID NOT NULL,
    content VARCHAR(24),
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)