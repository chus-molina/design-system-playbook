-- Promover a info@chusmolina.com como admin
-- EJECUTAR DESPUÉS de que el usuario se haya registrado/creado
update public.profiles
set role = 'admin'
where email = 'info@chusmolina.com';
