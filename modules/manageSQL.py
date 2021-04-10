from django.db import transaction, connection

class ManageSQL():
    def retreieveSQL(self, sql, bindParam):
        with connection.cursor() as cursor:
            cursor.execute(sql, bindParam)
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
            rowData = list()
            for row in rows:
                rowData.append(dict(zip(columns, row)))
            return rowData

    def executeSQL(self, sql, bindParam):
        with connection.cursor() as cursor:
            cursor.execute(sql, bindParam)

            return cursor.rowcount