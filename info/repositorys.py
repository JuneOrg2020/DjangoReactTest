from django.db import transaction, connection
from modules.manageSQL import ManageSQL

class InfoRepositorys():
    manageSQL = ManageSQL()

    def getOwnInfo(self, userId):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*,
                B.is_stocked
            FROM
                infos A
                LEFT OUTER JOIN stocks AS B
                    ON A.info_id = B.info_id AND
                       B.user_id = %(userId)s AND
                       B.is_stocked = 1
            WHERE 
                A.user_id = %(userId)s
        """,
            {'userId': userId }
        );

        return rowData

    def getOwnStock(self, userId):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                B.*,
                A.is_stocked
            FROM
                stocks A
                INNER JOIN infos AS B
                    ON A.info_id = B.info_id
            WHERE 
                A.user_id = %(userId)s AND
                A.is_stocked = 1
        """,
            {'userId': userId }
        );

        return rowData

    def searchInfo(self, word, userId):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*,
                B.is_stocked
            FROM
                infos A
                LEFT OUTER JOIN stocks AS B 
                    ON A.info_id = B.info_id AND
                       B.user_id = %(userId)s
            WHERE 
                A.text LIKE %(word)s
            LIMIT 30
        """,
            {'word': '%'+word+'%', 'userId': userId }
        );

        return rowData

    def searchLinkedInfo(self, word, userId):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT
                Y.info_id,
                Y.text,
                Z.is_stocked
            FROM
                (
                    SELECT
                        A.tolink_id
                    FROM
                        infos A
                    WHERE
                        A.text LIKE %(word)s AND
                        A.tolink_id IS NOT NULL
                ) X
                INNER JOIN infos AS Y
                    ON Y.info_id = X.tolink_id
                LEFT OUTER JOIN stocks AS Z
                    ON Z.info_id = X.tolink_id AND
                       Z.user_id = %(userId)s
            LIMIT 30
        """,
            {'word': '%'+word+'%', 'userId': userId }
        );

        return rowData

    def searchLinker(self, word):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*
            FROM
                linkers A
            WHERE 
                A.text LIKE %(word)s
            LIMIT 30
        """,
            {'word': '%'+word+'%'}
        );

        return rowData

    def getInfo(self, infoId, userId):
        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*,
                B.is_stocked
            FROM
                infos A
                LEFT OUTER JOIN stocks AS B 
                    ON A.info_id = B.info_id AND
                       B.user_id = %(user_id)s
            WHERE 
                A.info_id = %(id)s
        """,
            {'id': infoId, 'user_id': userId }
        );

        return rowData

    def createInfo(self, text, userId, linkedId):
        rowData = self.manageSQL.retreieveSQL("""
            INSERT INTO infos 
                (
                    text,
                    user_id,
                    tolink_id
                ) VALUES (
                    %(text)s,
                    %(userId)s,
                    %(linkedId)s
                ) RETURNING info_id
        """,
            {'text': text, 'userId': userId, 'linkedId': linkedId}
        );

        return rowData

    def addLinkedCount(self, infoId):
        result = self.manageSQL.executeSQL("""
            UPDATE infos
                SET
                    linked_count = linked_count + 1
                WHERE
                    info_id = %(infoId)s
        """,
            {'infoId': infoId}
        );

    def getMap(self, infoId, userId, relCount):

        rowData = self.manageSQL.retreieveSQL("""
            WITH LINKED_INFO AS (
                SELECT
                    A.info_id AS main_id,
                    A.text    AS main_text,
                    B.info_id AS sub_id,
                    B.text    AS sub_text,
                    B.linked_count
                FROM
                    infos A
                        LEFT OUTER JOIN infos AS B 
                            ON B.tolink_id = A.info_id
                WHERE
                    A.info_id = %(info_id)s
                ORDER BY
                    B.linked_count DESC
                LIMIT %(rel_count)s
            )
            SELECT
                X.sub_id as info_id,
                X.sub_text as info_text,
                S.is_stocked,
                T.linker_id,
                T.link_type,
                T.text as link_text,
                U.linker_id as r_linker_id,
                U.link_type as r_link_type,
                U.text as r_link_text
            FROM 
                LINKED_INFO X
                    LEFT OUTER JOIN stocks AS S
                        ON X.sub_id = S.info_id AND
                           S.user_id = %(user_id)s
                    LEFT OUTER JOIN 
                        (
                            SELECT
                                B.main_id,
                                B.sub_id,
                                A.linker_id,
                                A.link_type,
                                A.text
                            FROM
                                linkers A,
                                LINKED_INFO B
                            WHERE
                                A.info_1 = B.main_id AND A.info_2 = B.sub_id
                            ORDER BY
                                A.linker_id
                            LIMIT 5
                        ) AS T
                        ON X.main_id = T.main_id AND X.sub_id = T.sub_id
                    LEFT OUTER JOIN 
                        (
                            SELECT
                                B.main_id,
                                B.sub_id,
                                A.linker_id,
                                A.link_type,
                                A.text
                            FROM
                                linkers A,
                                LINKED_INFO B
                            WHERE
                                A.info_2 = B.main_id AND A.info_1 = B.sub_id
                            ORDER BY
                                A.linker_id
                            LIMIT 5
                        ) AS U
                        ON X.main_id = T.main_id AND X.sub_id = T.sub_id
                ORDER BY X.linked_count DESC
        """,
            {'info_id': infoId, 'user_id': userId, 'rel_count': relCount}
        );

        mapData = list()
        mapDataOne = None
        beforeId = None

        for rData in rowData:
            if rData["info_id"] == None:
                continue
            if beforeId != rData["info_id"]:
                if beforeId != None and beforeId != rData["info_id"]:
                    mapDataOne["linker"] = linkers
                    mapData.append(mapDataOne)
                linkers = list()
                mapDataOne = rData.copy()
                del mapDataOne["linker_id"]
                del mapDataOne["link_type"]
                del mapDataOne["link_text"]
                del mapDataOne["r_linker_id"]
                del mapDataOne["r_link_type"]
                del mapDataOne["r_link_text"]
                beforeId = rData["info_id"]

            linkers.append({
                'id': rData["linker_id"],
                'type': rData["link_type"],
                'text': rData["link_text"],
                'rId': rData["r_linker_id"],
                'rType': rData["r_link_type"],
                'rText': rData["r_link_text"]
            })
        if beforeId != None:
            mapDataOne["linker"] = linkers
            mapData.append(mapDataOne)

        return mapData

    def addLinker(self, type, text, info1, info2, userId):
        result = self.manageSQL.executeSQL("""
            INSERT INTO linkers 
                (
                    link_type,
                    text,
                    info_1,
                    info_2,
                    user_id
                ) VALUES (
                    %(type)s,
                    %(text)s,
                    %(info1)s,
                    %(info2)s,
                    %(userId)s
                )
        """,
            {'type': type, 'text': text, 'info1': info1, 'info2': info2, 'userId': userId}
        );

    def stockInfo(self, infoId, userId, toStockState):

        if toStockState:
            toStockState = 1
        else:
            toStockState = 0

        count = self.manageSQL.executeSQL("""
                UPDATE
                    stocks
                SET
                    is_stocked = %(toStockState)s
                WHERE
                    info_id = %(infoId)s AND
                    user_id = %(userId)s
            """,
            {'userId': userId, 'infoId': infoId, 'toStockState': toStockState}
        )

        if count > 0:
            return count

        self.manageSQL.executeSQL("""
            INSERT INTO stocks 
                (
                    info_id,
                    user_id,
                    is_stocked
                ) VALUES (
                    %(infoId)s,
                    %(userId)s,
                    1
                )
        """,
            {'userId': userId, 'infoId': infoId, 'toStockState': toStockState}
        )

        return count

    def getAllLinkerData(self, infoId):

        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*   
            FROM
                linkers A
            WHERE 
                A.info_1 = %(infoId)s OR
                A.info_2 = %(infoId)s
        """,
            {'infoId': infoId}
        )

        return rowData

    def getLinkerData(self, linkerId, userId):

        rowData = self.manageSQL.retreieveSQL("""
            SELECT 
                A.*,
                B.info_id as info_1_id,
                B.text as info_1_text,
                X.is_stocked as info_1_stocked,
                C.info_id as info_2_id,
                C.text as info_2_text,
                Y.is_stocked as info_2_stocked     
            FROM
                linkers A
                INNER JOIN infos AS B 
                    ON A.info_1 = B.info_id
                INNER JOIN infos AS C
                    ON A.info_2 = C.info_id
                LEFT OUTER JOIN stocks AS X
                    ON A.info_1 = X.info_id AND
                       X.user_id = %(userId)s
                LEFT OUTER JOIN stocks AS Y
                    ON A.info_2 = Y.info_id AND
                       Y.user_id = %(userId)s
            WHERE 
                A.linker_id = %(linkerId)s
        """,
            {'linkerId': linkerId, 'userId': userId}
        )

        return rowData

    def editLinker(self, linkerId, type, text):
        result = self.manageSQL.executeSQL("""
            UPDATE linkers
                SET
                    link_type = %(type)s,
                    text = %(text)s                    
                WHERE
                    linker_id = %(linkerId)s
        """,
            {'linkerId': linkerId, 'type': type, 'text': text}
        );