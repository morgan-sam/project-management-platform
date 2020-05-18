CREATE TABLE tasks (
  ID SERIAL PRIMARY KEY,
  task VARCHAR(100) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE,
  urgency SMALLINT NOT NULL,
  teams TEXT[],
  completed BOOLEAN NOT NULL
);

INSERT INTO tasks (task, date, urgency, completed)
VALUES  ('DB_INIT',  (now() at time zone 'utc'), 3, TRUE);