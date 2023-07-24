CREATE TABLE `old_passwords`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` TEXT NOT NULL,
    `conseñiaAnterior` BIGINT NOT NULL
);
CREATE TABLE `item_ticket`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ticket_id` BIGINT NOT NULL,
    `products_id` BIGINT NOT NULL,
    `precio` BIGINT NOT NULL
);
CREATE TABLE `products`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` TEXT NOT NULL,
    `categoria` TEXT NOT NULL,
    `precio` BIGINT NOT NULL,
    `descripcion` TEXT NOT NULL,
    `imagen` TEXT NOT NULL
);
CREATE TABLE `user_type`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoria` BIGINT NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` TEXT NOT NULL,
    `apellido` BIGINT NOT NULL,
    `nombreUsuario` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `user_type_id` BIGINT NOT NULL,
    `contraseñia` BIGINT NOT NULL
);
CREATE TABLE `ticket`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` BIGINT NOT NULL,
    `fecha` DATE NOT NULL,
    `direccion` TEXT NOT NULL,
    `ciudad` TEXT NOT NULL,
    `provincia` TEXT NOT NULL,
    `pais` TEXT NOT NULL,
    `total` BIGINT NULL,
    `cuit` BIGINT NOT NULL
);