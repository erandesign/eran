CREATE TABLE `concatinfo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phone` text,
	`info` text,
	`created_time` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `worklist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`address` text NOT NULL,
	`type` text NOT NULL,
	`time_start` text NOT NULL,
	`time_end` text NOT NULL,
	`investor` text NOT NULL,
	`area` text NOT NULL,
	`cover` text NOT NULL,
	`lang` text NOT NULL,
	`status` text NOT NULL,
	`content` text NOT NULL
);
