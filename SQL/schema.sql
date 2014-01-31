-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `id_users` TINYINT NULL DEFAULT NULL,
  `id_rooms` TINYINT NULL DEFAULT NULL,
  `text` VARCHAR(500) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
-- 
-- ---

DROP TABLE IF EXISTS `friends`;
    
CREATE TABLE `friends` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `id_users` TINYINT NULL DEFAULT NULL,
  `friend` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (id_rooms) REFERENCES `rooms` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`id_users`,`id_rooms`,`text`,`created_at`) VALUES
-- ('','','','','');
-- INSERT INTO `users` (`id`,`username`,`created_at`) VALUES
-- ('','','');
-- INSERT INTO `friends` (`id`,`id_users`,`friend`) VALUES
-- ('','','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');