/*
  # Local Community Events Database Schema

  ## Overview
  This migration creates the core database structure for the Local Community Events platform,
  enabling users to discover events and register for them.

  ## New Tables
  
  ### `events`
  Stores all community events with their details:
  - `id` (uuid, primary key) - Unique identifier for each event
  - `title` (text) - Event name/title
  - `type` (text) - Category (Workshop, Music, Sports, Meetup, etc.)
  - `date` (date) - When the event takes place
  - `location` (text) - City or venue location
  - `host` (text) - Name of the event organizer
  - `description` (text) - Full event description
  - `created_at` (timestamptz) - When the event was created
  
  ### `rsvps`
  Tracks user registrations for events:
  - `id` (uuid, primary key) - Unique identifier for each RSVP
  - `event_id` (uuid, foreign key) - References the event
  - `user_name` (text) - Name of the person RSVPing
  - `user_email` (text) - Email of the person RSVPing
  - `created_at` (timestamptz) - When the RSVP was made

  ## Security
  - RLS enabled on both tables
  - Public read access for events (anyone can browse)
  - Anyone can create events and RSVPs
  - Users can view all RSVPs

  ## Data
  - Pre-populates the events table with 20 sample community events
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  host text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create rsvps table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  user_email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Events policies: Anyone can read, anyone can insert
DROP POLICY IF EXISTS "Anyone can view events" ON events;
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create events" ON events;
CREATE POLICY "Anyone can create events"
  ON events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RSVPs policies: Anyone can read and create
DROP POLICY IF EXISTS "Anyone can view RSVPs" ON rsvps;
CREATE POLICY "Anyone can view RSVPs"
  ON rsvps FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create RSVPs" ON rsvps;
CREATE POLICY "Anyone can create RSVPs"
  ON rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert sample events data
INSERT INTO events (title, type, date, location, host, description) VALUES
  ('Community Yoga Session', 'Fitness', '2025-08-20', 'Bangalore', 'Yoga with Anu', 'Join us for a peaceful yoga session in Cubbon Park.'),
  ('Beginner Guitar Workshop', 'Music', '2025-08-22', 'Mumbai', 'Strings Academy', 'Learn the basics of guitar playing with hands-on guidance.'),
  ('Startup Networking Meetup', 'Meetup', '2025-08-25', 'Delhi', 'Delhi Entrepreneurs Club', 'Meet fellow entrepreneurs, pitch ideas, and network.'),
  ('Digital Marketing Seminar', 'Workshop', '2025-08-28', 'Hyderabad', 'Marketing Gurus', 'Learn the latest trends and strategies in digital marketing.'),
  ('Weekend Trek to Nandi Hills', 'Sports', '2025-08-30', 'Bangalore', 'Adventure Trails', 'An early morning trek to Nandi Hills followed by breakfast.'),
  ('Art & Craft for Kids', 'Workshop', '2025-09-01', 'Pune', 'Creative Hands', 'Fun and educational art activities for children aged 6–12.'),
  ('City Photography Walk', 'Meetup', '2025-09-03', 'Chennai', 'Lens Lovers Club', 'Explore the city while improving your photography skills.'),
  ('Cooking Masterclass: Italian Cuisine', 'Workshop', '2025-09-05', 'Kolkata', 'Chef Maria', 'Learn to cook authentic Italian dishes from scratch.'),
  ('Live Jazz Night', 'Music', '2025-09-07', 'Goa', 'Goa Jazz Club', 'An evening of live jazz performances by local musicians.'),
  ('Community Beach Cleanup', 'Social', '2025-09-10', 'Mumbai', 'Eco Warriors', 'Join us in cleaning up Juhu Beach and making a difference.'),
  ('Stand-up Comedy Night', 'Entertainment', '2025-09-12', 'Bangalore', 'Laugh Out Loud', 'A night full of laughter with top stand-up comedians.'),
  ('Chess Tournament', 'Sports', '2025-09-14', 'Delhi', 'Delhi Chess Club', 'Compete with fellow chess enthusiasts for exciting prizes.'),
  ('Mindfulness Meditation Retreat', 'Fitness', '2025-09-16', 'Rishikesh', 'Peaceful Minds', 'A weekend retreat to practice mindfulness and meditation.'),
  ('Blockchain for Beginners', 'Workshop', '2025-09-18', 'Pune', 'TechLearn Hub', 'Understand the basics of blockchain and its applications.'),
  ('Bird Watching Morning', 'Meetup', '2025-09-20', 'Jaipur', 'Nature Explorers', 'Join us to spot and learn about local bird species.'),
  ('Poetry Open Mic', 'Entertainment', '2025-09-22', 'Chandigarh', 'Words & Verses', 'An evening for poets to share their work with the community.'),
  ('DIY Home Gardening Workshop', 'Workshop', '2025-09-24', 'Ahmedabad', 'Green Thumbs', 'Learn how to start and maintain your own home garden.'),
  ('Marathon for Charity', 'Sports', '2025-09-26', 'Kochi', 'Run for Cause', 'Participate in a marathon to raise funds for charity.'),
  ('Language Exchange Meetup', 'Meetup', '2025-09-28', 'Bangalore', 'Global Friends', 'Practice languages and make friends from different cultures.'),
  ('Film Screening: Indie Shorts', 'Entertainment', '2025-09-30', 'Mumbai', 'Cinephiles Club', 'An evening of short films by independent filmmakers.');
