/*use weekly to purge old reset password requests*/
DELETE FROM mydb.pending_resets WHERE created_at < (NOW() - INTERVAL 1 DAY)